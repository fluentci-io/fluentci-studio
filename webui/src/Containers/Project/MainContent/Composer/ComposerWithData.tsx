import { FC } from "react";
import Composer from "./Composer";
import { useRecoilState } from "recoil";
import { ComposerState } from "./ComposerState";
import { Pipeline } from "./NewActionModal/NewActionModalWithData";
import { useSaveActionsMutation } from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";

const ComposerWithData: FC = () => {
  const { id } = useParams();
  const [saveAction] = useSaveActionsMutation();
  const [actions, setActions] = useRecoilState(ComposerState);
  const _setActions = (actions: Pipeline[]) => {
    setActions(actions);
    saveAction({
      variables: {
        projectId: id!,
        actions: actions.map((action) => ({
          commands: action.command,
          enabled: !!action.active,
          logo: action.logo,
          name: action.actionName!,
          plugin: action.name!,
          useWasm: !!action.useWasmPlugin,
        })),
      },
    });
  };
  return <Composer actions={actions} setActions={_setActions} />;
};

export default ComposerWithData;
