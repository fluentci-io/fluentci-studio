import { FC } from "react";
import MainContent from "./MainContent";
import { useRecoilValue } from "recoil";
import { sideNavigationState } from "../../../Components/SideNavigation/SideNavigationState";

const MainContentWithData: FC = () => {
  const currentTab = useRecoilValue(sideNavigationState);
  const titles: Record<string, string> = {
    jobs: "Deno Pipeline",
    build: "Build",
    deploy: "Deploy",
  };
  return <MainContent title={titles[currentTab]} />;
};

export default MainContentWithData;
