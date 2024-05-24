import { FC } from "react";
import Action from "./Action";
import { useRecoilState } from "recoil";
import { ComposerState } from "../ComposerState";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";
import { useSaveActionsMutation } from "../../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";

export type ActionWithDataProps = {
  action: Pipeline;
  index: number;
  onClickAction: (action: Pipeline, index: number) => void;
  onDelete: (position: number) => void;
  onDuplicate: (position: number) => void;
};

const ActionWithData: FC<ActionWithDataProps> = (props) => {
  const { id } = useParams();
  const [saveActions] = useSaveActionsMutation();
  const [actions, setActions] = useRecoilState(ComposerState);
  const activate = (checked: boolean) => {
    const updated = [...actions];
    updated[props.index] = {
      ...updated[props.index],
      active: checked,
    };
    _setActions(updated);
  };

  const _setActions = (actions: Pipeline[]) => {
    setActions(actions);
    saveActions({
      variables: {
        projectId: id!,
        actions: actions.map((action) => ({
          commands: action.command,
          enabled: !!action.active,
          logo: action.logo,
          name: action.actionName!,
          plugin: action.name!,
          useWasm: !!action.useWasmPlugin,
          githubUrl: action.githubUrl,
        })),
      },
    });
  };

  return <Action {...props} activate={activate} />;
};

export default ActionWithData;
