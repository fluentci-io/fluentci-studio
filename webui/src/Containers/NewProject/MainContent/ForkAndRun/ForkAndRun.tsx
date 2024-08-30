import { FC } from "react";
import { Container } from "./styles";
import { Spinner } from "baseui/spinner";

export type ForkAndRunProps = {
  loading?: boolean;
};

const ForkAndRun: FC<ForkAndRunProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Spinner
          $size={"20px"}
          $borderWidth={"3px"}
          style={{
            borderRightColor: "#ffffff22",
            borderLeftColor: "#ffffff22",
            borderTopColor: "#ffffff22",
            borderBottomColor: "#24ffd7",
          }}
        />
      )}
      {!loading && <Container>Fork & Run</Container>}
    </>
  );
};

export default ForkAndRun;
