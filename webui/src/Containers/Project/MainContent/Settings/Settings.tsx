import { BaseSyntheticEvent, FC } from "react";
import styles, {
  Title,
  Text,
  Label,
  Section,
  Cluster,
  ClusterStart,
  SaveButton,
} from "./styles";
import { Input } from "baseui/input";
import { Controller, useFormContext } from "react-hook-form";
import { Account } from "../../../../Hooks/GraphQL";
import { Spinner } from "baseui/spinner";

export type SettingsProps = {
  loading: boolean;
  me?: Account | null;
  handleSubmit: (e: BaseSyntheticEvent) => void;
};

const Settings: FC<SettingsProps> = ({ handleSubmit, me, loading }) => {
  const { control, watch } = useFormContext();
  const name = watch("name");
  return (
    <>
      <Section>
        <Title>General</Title>
        <Text>
          Here you can change the name and description of your project
          (pipeline), or even decide to share it with the rest of the world.
        </Text>
      </Section>
      {!!me && (
        <Section>
          <Label>Cluster size</Label>
          <Cluster>
            <ClusterStart>FL-10</ClusterStart>
            <div style={{ padding: 6, textAlign: "center" }}>
              6 vCPU &middot; 16GB memory
            </div>
          </Cluster>
        </Section>
      )}
      <Section>
        <Label>
          Name{" "}
          <span style={{ color: "#ffffff71", fontWeight: 500 }}>
            {" "}
            - Required
          </span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Example: Deploy to production"
              overrides={styles.Input}
              error={!name?.trim().length}
            />
          )}
        />
      </Section>
      <Section>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input {...field} overrides={styles.Input} />}
        />
      </Section>
      <Section>
        <Label>Tags</Label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <Input {...field} overrides={styles.Input} />}
        />
        <Text style={{ marginTop: 5 }}>
          Short words to categorize this pipeline. Separate multiple tags with a
          comma
        </Text>
      </Section>
      {!loading && <SaveButton onClick={handleSubmit}>Save</SaveButton>}
      {loading && (
        <SaveButton>
          <Spinner
            $size={"15px"}
            $borderWidth={"3px"}
            style={{
              borderRightColor: "#ffffff22",
              borderLeftColor: "#ffffff22",
              borderTopColor: "#ffffff22",
              borderBottomColor: "#000",
            }}
          />
        </SaveButton>
      )}
    </>
  );
};

export default Settings;
