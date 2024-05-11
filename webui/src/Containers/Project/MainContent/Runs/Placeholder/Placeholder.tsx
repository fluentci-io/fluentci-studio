import { FC } from "react";
import { Container, Text } from "./styles";

const Placeholder: FC = () => {
  return (
    <Container>
      <div style={{ marginTop: 20 }}>
        <Text>THERE'S NOTHING HERE YET BUT THAT'S OKAY</Text>
      </div>

      <p>Once available, the timeline of pipeline runs will appear here</p>
    </Container>
  );
};

export default Placeholder;
