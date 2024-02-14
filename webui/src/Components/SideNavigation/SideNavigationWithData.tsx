import { FC } from "react";
import SideNavigation from "./SideNavigation";
import { useRecoilState } from "recoil";
import { sideNavigationState } from "./SideNavigationState";
import { useGetJobsQuery, useGetProjectQuery } from "../../Hooks/GraphQL";

const SideNavigationWithData: FC = () => {
  const { data } = useGetJobsQuery();
  const { data: projectData } = useGetProjectQuery({
    variables: {
      id: "1",
    },
  });
  const [currentTab, setCurrentTab] = useRecoilState(sideNavigationState);
  console.log(">> jobs", data);

  const onRun = (id: string) => {
    console.log(">> onRun", id);
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
