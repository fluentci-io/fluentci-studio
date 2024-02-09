import { FC } from "react";
import SideNavigation from "../../Components/SideNavigation";
import styled from "@emotion/styled";
import MainContent from "./MainContent";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Home: FC = () => {
  return (
    <Container>
      <SideNavigation />
      <MainContent />
    </Container>
  );
};

export default Home;
