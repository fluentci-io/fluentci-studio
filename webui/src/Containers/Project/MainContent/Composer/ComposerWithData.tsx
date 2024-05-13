import { FC, useEffect } from "react";
import Composer from "./Composer";
import { useRecoilState } from "recoil";
import { ComposerState } from "./ComposerState";
import { Pipeline } from "./NewActionModal/NewActionModalWithData";
import {
  useGetActionsQuery,
  useSaveActionsMutation,
} from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";

const ComposerWithData: FC = () => {
  const { id } = useParams();
  const { data, refetch } = useGetActionsQuery({
    variables: {
      projectId: id!,
    },
  });
  const [saveAction] = useSaveActionsMutation();
  const [actions, setActions] = useRecoilState(ComposerState);
  const _setActions = async (actions: Pipeline[]) => {
    setActions(actions);
    await saveAction({
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
    await refetch();
  };

  useEffect(() => {
    if (data?.actions) {
      setActions(
        data.actions.map((action) => ({
          id: "",
          name: action.plugin,
          actionName: action.name,
          active: action.enabled,
          useWasmPlugin: action.useWasm,
          command: action.commands,
          description: "",
          githubUrl: "",
          logo: action.logo || "",
          packageId: action.plugin,
          downloads: 0,
          version: "",
          license: "",
          defaultBranch: "",
          updatedAt: "",
          comingSoon: false,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.actions]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Composer actions={actions} setActions={_setActions} />;
};

export default ComposerWithData;