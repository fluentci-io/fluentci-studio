import { FC } from "react";
import { Container } from "./styles";
import Header from "../../../Components/Header";
import Organizations from "./Organizations";
import Repositories from "./Repositories";

const MainContent: FC = () => {
  return (
    <Container>
      <Header />
      <Organizations />
      <Repositories />
    </Container>
  );
};

export default MainContent;
