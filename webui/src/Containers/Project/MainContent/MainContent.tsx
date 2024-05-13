import { FC, useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { CollectionPlay } from "@styled-icons/bootstrap";
import { SettingsOutline } from "@styled-icons/evaicons-outline";
import Runs from "./Runs";
import Composer from "./Composer";
import styles, { Container } from "./styles";
import Header from "../../../Components/Header";

const MainContent: FC = () => {
  const [activeKey, setActiveKey] = useState("0");

  return (
    <Container>
      <Header />
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey.toString());
        }}
        activateOnFocus
        overrides={styles.Tabs}
      >
        <Tab
          title={
            <>
              <CollectionPlay size={24} />
              <span style={{ marginLeft: 15 }}>Runs</span>
            </>
          }
          overrides={styles.Tab}
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
          overrides={styles.Tab}
        >
          <Composer />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MainContent;