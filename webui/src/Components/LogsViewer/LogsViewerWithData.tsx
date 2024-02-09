import { FC } from "react";
import LogsViewer from "./LogsViewer";
import { logs } from "./mocks";

const LogsViewerWithData: FC = () => {
  return <LogsViewer logs={logs.split("\n")} />;
};

export default LogsViewerWithData;
