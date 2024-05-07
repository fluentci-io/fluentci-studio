import { FC } from "react";
import Run from "./Run";
import { actions } from "./mocks";

const RunWithData: FC = () => {
  return <Run actions={actions} />;
};

export default RunWithData;
