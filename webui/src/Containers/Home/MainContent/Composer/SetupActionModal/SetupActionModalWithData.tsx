import { FormProvider, useForm } from "react-hook-form";
import SetupActionModal from "./SetupActionModal";
import { FC, useEffect } from "react";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";

export type SetupActionModalWithDataProps = {
  onClose: () => void;
  onAddThisAction: (action: Pipeline) => void;
  onSaveChanges: (action: Pipeline) => void;
  isOpen: boolean;
  selectedAction: Pipeline;
  editAction: boolean;
};

const SetupActionModalWithData: FC<SetupActionModalWithDataProps> = (props) => {
  const methods = useForm({
    defaultValues: {
      commands: props.selectedAction?.command,
    },
  });

  useEffect(() => {
    methods.setValue("commands", props.selectedAction?.command);
  }, [props.selectedAction, methods]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(">>", data);
  };

  return (
    <FormProvider {...methods}>
      <SetupActionModal
        {...props}
        handleSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

export default SetupActionModalWithData;
