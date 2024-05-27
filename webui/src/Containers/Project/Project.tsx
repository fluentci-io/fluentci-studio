import { FC } from "react";
import styled from "@emotion/styled";
import MainContent from "./MainContent";
import Titlebar from "../../Components/Titlebar";

const Container = styled.div`
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const Home: FC = () => {
  return (
    <>
      <Titlebar />
      <Container>
        <MainContent />
      </Container>
    </>
  );
};

export default Home;
