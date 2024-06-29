import { FC, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Project,
  Repository,
  Run,
  useGetActionsLazyQuery,
  useGetActionsQuery,
  useGetLinkedRepositoryLazyQuery,
  useGetProjectLazyQuery,
  useGetRunLazyQuery,
  useRunPipelineMutation,
} from "../../Hooks/GraphQL";
import { useRecoilState, useRecoilValue } from "recoil";
import { ComposerState } from "../../Containers/Project/MainContent/Composer/ComposerState";
import { AuthState } from "../../Containers/Auth/AuthState";
import { ProjectState } from "../../Containers/Project/ProjectState";

export type HeaderWithDataProps = {
  breadcrumbs?: { title: string; link?: string }[];
};

const HeaderWithData: FC<HeaderWithDataProps> = () => {
  const me = useRecoilValue(AuthState);
  const composerState = useRecoilValue(ComposerState);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [{ project }, setProjectState] = useRecoilState(ProjectState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [actions, setActions] = useState<any[]>([]);
  const [run, setRun] = useState<Run | null | undefined>(null);
  const [getProject] = useGetProjectLazyQuery({
    variables: {
      id: id!,
    },
    fetchPolicy: "cache-and-network",
  });
  const [getRun] = useGetRunLazyQuery({
    variables: {
      id: id!,
    },
  });
  const [runPipeline] = useRunPipelineMutation();
  const [getActions] = useGetActionsLazyQuery();
  const { data } = useGetActionsQuery({
    variables: {
      projectId: project?.id || "",
    },
    fetchPolicy: "cache-and-network",
  });
  const [linkedRepository, setLinkedRepository] = useState<
    Repository | null | undefined
  >(null);
  const [getLinkedRepository] = useGetLinkedRepositoryLazyQuery();
  const [loading, setLoading] = useState(false);

  const setProject = (value?: Project | null) =>
    setProjectState({ project: value });

  useEffect(() => {
    if (pathname.startsWith("/run")) {
      getRun().then(({ data }) => {
        setRun(data?.getRun);
        if (data?.getRun?.projectId) {
          getProject({
            variables: {
              id: data.getRun.projectId,
            },
            fetchPolicy: "cache-and-network",
          }).then(({ data }) => setProject(data?.project));
        }
      });
      return;
    }
    if (
      pathname.startsWith("/project") ||
      pathname.startsWith("/link-project")
    ) {
      getProject({
        variables: {
          id: id!,
        },
        fetchPolicy: "cache-and-network",
      }).then(({ data }) => setProject(data?.project));
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!me || !project) {
      return;
    }
    getLinkedRepository({
      variables: {
        projectId: project.id,
      },
      fetchPolicy: "cache-and-network",
    }).then((res) => setLinkedRepository(res.data?.linkedRepository));
  }, [me, getLinkedRepository, project]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setActions(data.actions || []);
  }, [data]);

  const onRun = () => {
    runPipeline({
      variables: {
        projectId: project!.id!,
      },
    }).then(({ data }) => {
      setLoading(false);
      if (data?.runPipeline) {
        navigate(`/run/${data.runPipeline.id}`);
      }
    });
    setLoading(true);
  };

  const breadcrumbs: { title: string; link?: string }[] = [
    {
      title: "Projects",
      link: "/",
    },
    {
      title: project?.displayName || project?.name || "",
      link: run && project?.id ? `/project/${project.id}` : undefined,
    },
  ];

  if (run) {
    breadcrumbs.push({
      title: run.name,
    });
  }

  useEffect(() => {
    if (!project) {
      return;
    }
    setTimeout(() => {
      getActions({
        variables: {
          projectId: project.id,
        },
        fetchPolicy: "cache-and-network",
      }).then(({ data }) => {
        setActions(data?.actions || []);
      });
    }, 1500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerState]);

  return (
    <Header
      id="1"
      onRun={onRun}
      breadcrumbs={breadcrumbs}
      showRunButton={
        !!project &&
        !pathname.startsWith("/link-project") &&
        (!!actions?.filter((x) => x.enabled).length ||
          (project?.path !== "empty" && !linkedRepository) ||
          (!!linkedRepository && !!actions?.filter((x) => x.enabled).length))
      }
      loading={loading}
      linkedRepository={linkedRepository}
    />
  );
};

export default HeaderWithData;
