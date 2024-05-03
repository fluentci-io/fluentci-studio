import { FC, useState } from "react";
import { Modal, ModalBody } from "baseui/modal";
import { Tabs, Tab } from "baseui/tabs-motion";
import styled from "@emotion/styled";
import { PackageIcon } from "@styled-icons/feather";
import { Play } from "@styled-icons/fluentui-system-regular";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";

const RunButton = styled.button`
  height: 40px;
  background-color: #24ffb5;
  color: #000;
  border: none;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #18d193;
  }
`;

export type SetupActionModalProps = {
  onClose: () => void;
  onAddThisAction: (action: {
    id: string;
    name: string;
    command: string;
    logo?: string;
  }) => void;
  isOpen: boolean;
  selectedAction: Pipeline;
};

const SetupActionModal: FC<SetupActionModalProps> = (props) => {
  const { onClose, onAddThisAction, isOpen, selectedAction } = props;
  const [activeKey, setActiveKey] = useState("0");

  return (
    <Modal
      onClose={() => {
        onClose();
        setActiveKey("0");
      }}
      isOpen={isOpen}
      size={"auto"}
      overrides={{
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: "#0f0124",
            color: "#fff",
            fontFamily: $theme.primaryFontFamily,
          }),
        },
        Close: {
          style: {
            color: "#fff",
          },
        },
      }}
    >
      <ModalBody
        style={{
          margin: 0,
        }}
      >
        <div
          style={{
            height: "70vh",
            width: "60vw",
            color: "#fff",
            fontFamily: "Lexend",
            padding: 20,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              height: "calc(100% - 40px)",
            }}
          >
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
                    <Play size={24} />
                    <span style={{ marginLeft: 15 }}>Run</span>
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
              ></Tab>
              <Tab
                title={
                  <>
                    <PackageIcon size={24} />
                    <span style={{ marginLeft: 15 }}>
                      {selectedAction?.name.replace("_pipeline", "")}
                    </span>
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
              ></Tab>
            </Tabs>
          </div>
          <RunButton
            onClick={() => {
              setActiveKey("0");
              onAddThisAction({
                id: selectedAction.id,
                logo: selectedAction.logo,
                name: selectedAction.name,
                command: "build",
              });
            }}
          >
            Add this action
          </RunButton>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SetupActionModal;
