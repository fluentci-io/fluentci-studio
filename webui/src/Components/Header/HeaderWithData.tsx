import { FC, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Project,
  Run,
  useGetActionsQuery,
  useGetProjectLazyQuery,
  useGetRunLazyQuery,
  useRunPipelineMutation,
} from "../../Hooks/GraphQL";
import { useRecoilValue } from "recoil";
import { ComposerState } from "../../Containers/Project/MainContent/Composer/ComposerState";

export type HeaderWithDataProps = {
  breadcrumbs?: { title: string; link?: string }[];
};

const HeaderWithData: FC<HeaderWithDataProps> = () => {
  const composerState = useRecoilValue(ComposerState);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null | undefined>(null);
  const [run, setRun] = useState<Run | null | undefined>(null);
  const [getProject] = useGetProjectLazyQuery({
    variables: {
      id: id!,
    },
  });
  const [getRun] = useGetRunLazyQuery({
    variables: {
      id: id!,
    },
  });
  const [runPipeline] = useRunPipelineMutation();
  const { data, refetch } = useGetActionsQuery({
    variables: {
      projectId: project?.id || "",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/run")) {
      getRun().then(({ data }) => {
        setRun(data?.getRun);
        if (data?.getRun?.projectId) {
          getProject({
            variables: {
              id: data.getRun.projectId,
            },
          }).then(({ data }) => setProject(data?.project));
        }
      });
      return;
    }
    if (
      pathname.startsWith("/project") ||
      pathname.startsWith("/link-project")
    ) {
      getProject().then(({ data }) => setProject(data?.project));
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      title: project?.name || "",
      link: run && project?.id ? `/project/${project.id}` : undefined,
    },
  ];

  if (run) {
    breadcrumbs.push({
      title: run.name,
    });
  }

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerState]);

  return (
    <Header
      id="1"
      onRun={onRun}
      breadcrumbs={breadcrumbs}
      hideRunButton={
        !data?.actions?.filter((x) => x.enabled).length ||
        project?.path === "empty"
      }
      loading={loading}
    />
  );
};

export default HeaderWithData;
