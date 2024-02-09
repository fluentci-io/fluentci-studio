import { FC } from "react";
import SideNavigation from "./SideNavigation";
import { useRecoilState } from "recoil";
import { sideNavigationState } from "./SideNavigationState";

const SideNavigationWithData: FC = () => {
  const [currentTab, setCurrentTab] = useRecoilState(sideNavigationState);
  return (
    <>
      <SideNavigation
        currentTab={currentTab}
        setCurrentTab={(value) => setCurrentTab(value)}
      />
    </>
  );
};

export default SideNavigationWithData;
