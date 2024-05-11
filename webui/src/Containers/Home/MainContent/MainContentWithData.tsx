import { FC } from "react";
import MainContent from "./MainContent";
import { useGetProjectsQuery } from "../../../Hooks/GraphQL";

const MainContentWithData: FC = () => {
  const { data } = useGetProjectsQuery();
  return <MainContent projects={data?.projects} />;
};

export default MainContentWithData;
