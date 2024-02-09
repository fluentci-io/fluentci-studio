import { FC } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex: 1;
  margin-top: 60px;
  margin-left: 50px;
  margin-right: 50px;
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const RunButton = styled.button`
  height: 40px;
  background-color: #0ce5f1;
  color: #000;
  border: none;
  font-weight: 600;
  width: 150px;
  cursor: pointer;
`;

export type MainContentProps = {
  title: string;
};

const MainContent: FC<MainContentProps> = (props) => {
  const { title } = props;
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <RunButton>Run</RunButton>
      </Header>
    </Container>
  );
};

export default MainContent;
