import { FC } from "react";
import MainContent from "./MainContent";
import { useRecoilValue } from "recoil";
import { sideNavigationState } from "../../../Components/SideNavigation/SideNavigationState";
import {
  useGetJobQuery,
  useGetProjectQuery,
  useRunJobMutation,
  useRunPipelineMutation,
} from "../../../Hooks/GraphQL";

const MainContentWithData: FC = () => {
  const currentTab = useRecoilValue(sideNavigationState);
  const { data: jobData } = useGetJobQuery({
    variables: {
      id: "1",
    },
  });
  const { data: projectData } = useGetProjectQuery({
    variables: {
      id: "1",
    },
  });
  const [runJobMutation] = useRunJobMutation();
  const [runPipelineMutation] = useRunPipelineMutation();

  console.log(">> job", jobData);
  console.log(">> project", projectData);
  console.log(">> currentTab", currentTab);

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
    <MainContent
      title={projectData?.project?.name || ""}
      onRun={onRun}
      id={"1"}
    />
  );
};

export default MainContentWithData;
