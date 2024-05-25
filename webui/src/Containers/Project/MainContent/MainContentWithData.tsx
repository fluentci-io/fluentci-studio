import { FC } from "react";
import MainContent from "./MainContent";
import { useRecoilState } from "recoil";
import { TabsState } from "./TabsState";

const MainContentWithData: FC = () => {
  const state = useRecoilState(TabsState);
  return <MainContent onTabChange={(value) => state[1](value)} />;
};

export default MainContentWithData;
