import { FC } from "react";
import styled from "@emotion/styled";
import LogsViewer from "../../../Components/LogsViewer";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 60px;
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
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
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

const LogsWrapper = styled.div`
  height: calc(100vh - 60px);
  overflow: auto;
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
      <LogsWrapper>
        <LogsViewer />
      </LogsWrapper>
    </Container>
  );
};

export default MainContent;
