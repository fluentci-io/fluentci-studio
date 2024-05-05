import { FC } from "react";
import Action from "./Action";
import { useRecoilState } from "recoil";
import { ComposerState } from "../ComposerState";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";

export type ActionWithDataProps = {
  action: Pipeline;
  index: number;
  onClickAction: (action: Pipeline, index: number) => void;
  onDelete: (position: number) => void;
  onDuplicate: (position: number) => void;
};

const ActionWithData: FC<ActionWithDataProps> = (props) => {
  const [actions, setActions] = useRecoilState(ComposerState);
  const activate = (checked: boolean) => {
    const updated = [...actions];
    updated[props.index] = {
      ...updated[props.index],
      active: checked,
    };
    setActions(updated);
  };
  return <Action {...props} activate={activate} />;
};

export default ActionWithData;
