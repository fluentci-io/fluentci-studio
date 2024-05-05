import { FC } from "react";
import { Textarea } from "baseui/textarea";
import { Terminal } from "@styled-icons/bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./styles";

const Commands: FC = () => {
  const { control } = useFormContext();
  return (
    <div style={{ paddingTop: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Terminal size={18} style={{ marginRight: 10, color: "#a59fad" }} />
        <label style={{ color: "#a59fad" }}>Commands</label>
      </div>
      <Controller
        name="commands"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            clearable
            autoFocus
            overrides={styles.Textarea}
            placeholder="Call a function exposed by the plugin here, e.g. build"
          />
        )}
      />
    </div>
  );
};

export default Commands;
