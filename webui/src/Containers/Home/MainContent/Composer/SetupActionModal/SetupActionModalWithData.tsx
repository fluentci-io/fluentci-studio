import { FormProvider, useForm } from "react-hook-form";
import SetupActionModal from "./SetupActionModal";
import { FC, useEffect } from "react";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";
import { useRecoilState } from "recoil";
import { ComposerState } from "../ComposerState";

export type SetupActionModalWithDataProps = {
  onClose: () => void;
  onAddThisAction: (action: Pipeline) => void;
  onSaveChanges: () => void;
  isOpen: boolean;
  selectedAction: Pipeline;
  editAction: boolean;
  actionPosition?: number | null;
};

const SetupActionModalWithData: FC<SetupActionModalWithDataProps> = (props) => {
  const [actions, setActions] = useRecoilState(ComposerState);
  const methods = useForm({
    defaultValues: {
      commands: props.selectedAction?.command,
      name: props.selectedAction?.command?.split("\n")?.reverse()[0],
    },
  });

  useEffect(() => {
    methods.setValue("commands", props.selectedAction?.command);
    methods.setValue(
      "name",
      props.selectedAction?.actionName ||
        props.selectedAction?.command?.split("\n")?.reverse()[0]
    );
  }, [props.selectedAction, methods]);

  const onSubmit = (data: { name: string; commands: string }) => {
    props.onSaveChanges();
    if (!props.editAction) {
      return;
    }
    const updated = [...actions];
    updated[props.actionPosition!] = {
      ...updated[props.actionPosition!],
      command: data.commands,
      actionName: data.name,
    };
    setActions(updated);
  };

  return (
    <FormProvider {...methods}>
      <SetupActionModal
        {...props}
        onClose={() => {
          methods.reset({
            commands: props.selectedAction?.command,
            name:
              props.selectedAction?.actionName ||
              props.selectedAction?.command?.split("\n")?.reverse()[0],
          });
          props.onClose();
        }}
        handleSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

export default SetupActionModalWithData;
