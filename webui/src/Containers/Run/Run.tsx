import { FC, useState } from "react";
import { Accordion, Panel } from "baseui/accordion";
import Header from "../../Components/Header";
import { CheckCircle } from "@styled-icons/boxicons-solid";
import styles, {
  Action,
  Container,
  Duration,
  Loader,
  Status,
  Title,
  Wrapper,
  FullscreenButton,
} from "./styles";
import { ChevronRight, ChevronDown } from "@styled-icons/boxicons-solid";
import _ from "lodash";
import LogsViewer from "../../Components/LogsViewer";
import { Spinner } from "baseui/spinner";
import { Fullscreen, FullscreenExit } from "@styled-icons/bootstrap";
import { Modal, ModalHeader, SIZE } from "baseui/modal";

export type RunProps = {
  actions: {
    id: string;
    name: string;
    duration: string;
    status: "SUCCESS" | "FAILURE" | "RUNNING" | "PENDING";
  }[];
};

const Run: FC<RunProps> = (props) => {
  const { actions } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
  return (
    <Wrapper>
      <Container>
        <Header title="Run: #5" />
        <Accordion
          onChange={({ expanded }) => {
            setExpandedIndex(_.get(expanded, "0", null) as string | null);
          }}
          accordion
          overrides={styles.Accordion}
        >
          {actions.map((item, key) => (
            <Panel
              disabled={item.status === "PENDING"}
              key={key}
              title={
                <Action disabled={item.status === "PENDING"}>
                  <Status>
                    {key.toString() != expandedIndex! && key !== 2 && (
                      <ChevronRight size={24} />
                    )}
                    {key.toString() == expandedIndex! && key !== 2 && (
                      <ChevronDown size={24} />
                    )}
                  </Status>
                  <Loader>
                    {item.status == "SUCCESS" && (
                      <CheckCircle size={"24px"} color="#24ffa0" />
                    )}
                    {item.status == "RUNNING" && (
                      <Spinner
                        $size={"15px"}
                        $borderWidth={"3px"}
                        style={{
                          borderRightColor: "#ffffff22",
                          borderLeftColor: "#ffffff22",
                          borderTopColor: "#ffffff22",
                          borderBottomColor: "#24ffd7",
                        }}
                      />
                    )}
                  </Loader>
                  <Title>{item.name}</Title>
                  <Duration>{item.duration}</Duration>
                </Action>
              }
            >
              <div style={{ position: "relative" }}>
                <FullscreenButton onClick={() => setIsOpen(true)}>
                  <Fullscreen size={15} color="#fff" />
                </FullscreenButton>
                <LogsViewer />
              </div>
            </Panel>
          ))}
        </Accordion>
        <Modal
          onClose={() => setIsOpen(false)}
          closeable
          isOpen={isOpen}
          animate
          autoFocus
          size={SIZE.full}
          overrides={styles.Modal}
        >
          <ModalHeader>
            <FullscreenButton
              onClick={() => setIsOpen(false)}
              style={{ marginRight: 15 }}
            >
              <FullscreenExit size={15} color="#fff" />
            </FullscreenButton>
          </ModalHeader>
          <LogsViewer height="calc(100vh - 36px)" />
        </Modal>
      </Container>
    </Wrapper>
  );
};

export default Run;
