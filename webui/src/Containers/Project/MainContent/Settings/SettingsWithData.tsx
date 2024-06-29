import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Settings from "./Settings";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProjectState } from "../../ProjectState";
import { AuthState } from "../../../Auth/AuthState";
import { useUpdateProjectMutation } from "../../../../Hooks/GraphQL";
import _ from "lodash";

const SettingsWithData: FC = () => {
  const [updateProject] = useUpdateProjectMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const me = useRecoilValue(AuthState);
  const [{ project }, setProject] = useRecoilState(ProjectState);
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: project?.displayName || project?.name,
      description: project?.description,
      tags: _.get(project, "tags", [])?.join(", "),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setLoading(true);
    updateProject({
      variables: {
        id: project!.id,
        name: data.name,
        description: data.description,
        tags: data.tags,
      },
    })
      .then(({ data }) => {
        setProject({ project: data?.updateProject });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <Settings
        handleSubmit={methods.handleSubmit(onSubmit)}
        me={me}
        loading={loading}
      />
    </FormProvider>
  );
};

export default SettingsWithData;
