import { FC } from "react";
import Composer from "./Composer";
import { useRecoilState } from "recoil";
import { ComposerState } from "./ComposerState";

const ComposerWithData: FC = () => {
  const [actions, setActions] = useRecoilState(ComposerState);
  return <Composer actions={actions} setActions={setActions} />;
};

export default ComposerWithData;
