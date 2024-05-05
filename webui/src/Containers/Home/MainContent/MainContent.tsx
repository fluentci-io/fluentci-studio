import { FC, useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { CollectionPlay } from "@styled-icons/bootstrap";
import { SettingsOutline } from "@styled-icons/evaicons-outline";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import { StatefulPopover } from "baseui/popover";
import Runs from "./Runs";
import Composer from "./Composer";
import { StatefulMenu } from "baseui/menu";
import styles, {
  Container,
  Header,
  Title,
  RunButton,
  PopoverButton,
} from "./styles";

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
        <StatefulPopover
          content={({ close }) => (
            <StatefulMenu
              items={[
                {
                  label: "Export ...",
                },
                {
                  label: "Clear cache ...",
                },
              ]}
              onItemSelect={() => {
                close();
              }}
              overrides={styles.StatefulMenu}
            />
          )}
        >
          <PopoverButton onClick={(e) => e.stopPropagation()}>
            <EllipsisVertical size={20} />
          </PopoverButton>
        </StatefulPopover>
        <RunButton onClick={() => onRun(id)}>Run</RunButton>
      </Header>
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
