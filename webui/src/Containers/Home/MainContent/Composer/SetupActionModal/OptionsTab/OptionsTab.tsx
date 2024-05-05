import { Input } from "baseui/input";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Options: FC = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <>
            <label>Action Name</label>
            <Input
              {...field}
              autoFocus
              clearable
              placeholder="Name..."
              overrides={{
                Root: {
                  style: {
                    marginTop: "10px",
                    border: "1px solid #24ffb5",
                  },
                },
                Input: {
                  style: ({ $theme }) => ({
                    fontFamily: $theme.primaryFontFamily,
                  }),
                },
              }}
            />
          </>
        )}
      />
    </>
  );
};

export default Options;
