import { SignIn } from "@clerk/clerk-react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function Auth() {
  return (
    <Container>
      <SignIn path="/auth" />
    </Container>
  );
}
