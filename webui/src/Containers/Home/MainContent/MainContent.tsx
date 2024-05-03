import { FC, useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import styled from "@emotion/styled";
import { CollectionPlay } from "@styled-icons/bootstrap";
import { SettingsOutline } from "@styled-icons/evaicons-outline";
import Runs from "./Runs";
import Composer from "./Composer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0 auto;
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
  background-color: #24ffb5;
  color: #000;
  border: none;
  font-weight: 600;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #18d193;
  }
`;

export type MainContentProps = {
  id: string;
  title: string;
  onRun: (id: string) => void;
};

const MainContent: FC<MainContentProps> = (props) => {
  const { id, title, onRun } = props;
  const [activeKey, setActiveKey] = useState("0");

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <RunButton onClick={() => onRun(id)}>Run</RunButton>
      </Header>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey.toString());
        }}
        activateOnFocus
        overrides={{
          TabHighlight: {
            style: {
              backgroundColor: "#24ffb5",
            },
          },
          TabBorder: {
            style: {
              height: "0px",
            },
          },
        }}
      >
        <Tab
          title={
            <>
              <CollectionPlay size={24} />
              <span style={{ marginLeft: 15 }}>Runs</span>
            </>
          }
          overrides={{
            Tab: {
              style: ({ $isActive, $theme }) => ({
                backgroundColor: "#0f0124",
                color: $isActive ? "#24ffb5" : "#fff",
                fontFamily: $theme.primaryFontFamily,
                fontSize: "16px",
                ":hover": {
                  color: "#24ffb5",
                  backgroundColor: "#0f0124",
                },
              }),
            },
          }}
        >
          <Runs />
        </Tab>
        <Tab
          title={
            <>
              <SettingsOutline size={24} />
              <span style={{ marginLeft: 15 }}>Actions</span>
            </>
          }
          overrides={{
            Tab: {
              style: ({ $isActive, $theme }) => ({
                backgroundColor: "#0f0124",
                color: $isActive ? "#24ffb5" : "#fff",
                fontFamily: $theme.primaryFontFamily,
                fontSize: "16px",
                ":hover": {
                  color: "#24ffb5",
                  backgroundColor: "#0f0124",
                },
              }),
            },
          }}
        >
          <Composer />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MainContent;
