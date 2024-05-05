import { BaseSyntheticEvent, FC, useState } from "react";
import { Modal, ModalBody } from "baseui/modal";
import { Tabs, Tab } from "baseui/tabs-motion";
import { PackageIcon } from "@styled-icons/feather";
import { Play, Options } from "@styled-icons/fluentui-system-regular";
import { Variable } from "@styled-icons/heroicons-outline";
import { Pipeline } from "../NewActionModal/NewActionModalWithData";
import { Button } from "./styles";
import styles from "./styles";
import Commands from "./Commands";
import OptionsTab from "./OptionsTab";
import ModuleSettingsTab from "./ModuleSettingsTab";
import Variables from "./VariablesTab";

export type SetupActionModalProps = {
  onClose: () => void;
  onAddThisAction: (action: Pipeline) => void;
  onSaveChanges: (action: Pipeline) => void;
  isOpen: boolean;
  selectedAction: Pipeline;
  editAction: boolean;
  handleSubmit: (e: BaseSyntheticEvent) => void;
};

const SetupActionModal: FC<SetupActionModalProps> = (props) => {
  const {
    onClose,
    onAddThisAction,
    isOpen,
    selectedAction,
    handleSubmit,
    editAction,
  } = props;
  const [activeKey, setActiveKey] = useState("0");

  return (
    <Modal
      autoFocus
      onClose={() => {
        onClose();
        setActiveKey("0");
      }}
      isOpen={isOpen}
      size={"auto"}
      overrides={styles.Modal}
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
              overrides={styles.Tab}
            >
              <Tab
                title={
                  <>
                    <Play size={24} />
                    <span style={{ marginLeft: 15 }}>Run</span>
                  </>
                }
                overrides={styles.Tab}
              >
                <Commands />
              </Tab>
              <Tab
                title={
                  <>
                    <PackageIcon size={24} />
                    <span style={{ marginLeft: 15 }}>
                      {selectedAction?.name.replace("_pipeline", "")}
                    </span>
                  </>
                }
                overrides={styles.Tab}
              >
                <ModuleSettingsTab />
              </Tab>
              <Tab
                title={
                  <>
                    <Variable size={24} />
                    <span style={{ marginLeft: 15 }}>Variables</span>
                  </>
                }
                overrides={styles.Tab}
              >
                <Variables />
              </Tab>
              <Tab
                title={
                  <>
                    <Options size={24} />
                    <span style={{ marginLeft: 15 }}>Options</span>
                  </>
                }
                overrides={styles.Tab}
              >
                <OptionsTab />
              </Tab>
            </Tabs>
          </div>
          <>
            {!editAction && (
              <Button
                onClick={(e: BaseSyntheticEvent) => {
                  setActiveKey("0");
                  onAddThisAction({ ...selectedAction, active: true });
                  handleSubmit(e);
                }}
              >
                Add this action
              </Button>
            )}
            {editAction && <Button onClick={handleSubmit}>Save changes</Button>}
          </>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SetupActionModal;
