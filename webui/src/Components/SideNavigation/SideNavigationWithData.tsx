import { FC } from "react";
import SideNavigation from "./SideNavigation";
import { useRecoilState } from "recoil";
import { sideNavigationState } from "./SideNavigationState";
import {
  useGetJobsQuery,
  useGetProjectQuery,
  useRunJobMutation,
  useRunPipelineMutation,
} from "../../Hooks/GraphQL";

const SideNavigationWithData: FC = () => {
  const { data } = useGetJobsQuery();
  const { data: projectData } = useGetProjectQuery({
    variables: {
      id: "1",
    },
  });
  const [runJobMutation] = useRunJobMutation();
  const [runPipelineMutation] = useRunPipelineMutation();
  const [currentTab, setCurrentTab] = useRecoilState(sideNavigationState);

  console.log(">> jobs", data);

  const onRun = async (id: string) => {
    console.log(">> onRun", id);
    await runJobMutation({
      variables: {
        jobName: "",
      },
    });
    await runPipelineMutation({
      variables: {
        projectId: "",
      },
    });
  };

  return (
    <>
      <SideNavigation
        currentTab={currentTab}
        setCurrentTab={(value) => setCurrentTab(value)}
        onRun={onRun}
        jobs={data?.jobs || []}
        project={projectData?.project || { id: "1", name: "Project" }}
      />
    </>
  );
};

export default SideNavigationWithData;
