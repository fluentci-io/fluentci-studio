import { FC, useState } from "react";
import { PlusLg } from "@styled-icons/bootstrap";
import { Terminal } from "@styled-icons/bootstrap";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import NewActionModal from "./NewActionModal";
import SetupActionModal from "./SetupActionModal";
import { Pipeline } from "./NewActionModal/NewActionModalWithData";
import {
  Action,
  ActionName,
  Connector,
  ConnectorContainer,
  PlusButton,
} from "./styles";

export type ComposerProps = {
  actions: Pipeline[];
};

const Composer: FC<ComposerProps> = (props) => {
  const [actions, setActions] = useState<Pipeline[]>(props.actions);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Pipeline | null>(null);
  const [isSetupActionModalOpen, setIsSetupActionModalOpen] = useState(false);
  const [editAction, setEditAction] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(0);

  function close() {
    setIsOpen(false);
  }

  function onAddNewAction(item: Pipeline) {
    setIsOpen(false);
    setTimeout(() => setIsSetupActionModalOpen(false), 50);
    const updated = [...actions];
    updated.splice(clickedPosition, 0, item);
    setActions(updated);
  }

  function onClickAction(action: Pipeline) {
    setSelectedAction(action);
    setEditAction(true);
    setIsSetupActionModalOpen(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
      <PlusButton
        onClick={() => {
          setEditAction(false);
          setIsOpen(true);
          setClickedPosition(0);
        }}
      >
        <PlusLg size={15} color="#fff" />
      </PlusButton>
      {actions.map((action, index) => (
        <div key={action.id}>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          <Action onClick={() => onClickAction(action)}>
            {action.logo && (
              <img
                src={action.logo}
                alt={action.name}
                style={{
                  backgroundColor:
                    action.name.startsWith("deno") ||
                    action.name.startsWith("github") ||
                    action.name.startsWith("rust") ||
                    action.name.startsWith("trivy") ||
                    action.name.startsWith("symfony") ||
                    action.name.startsWith("flakestry") ||
                    action.name.startsWith("symfony") ||
                    action.name.startsWith("heroku") ||
                    action.name.startsWith("django") ||
                    action.name.startsWith("terraform") ||
                    action.name.startsWith("prisma")
                      ? "#fff"
                      : "initial",
                  maxWidth: 34,
                  borderRadius: 2,
                  padding: 5,
                  marginRight: 15,
                }}
              />
            )}
            {!action.logo && (
              <Terminal
                size={32}
                color="#fff"
                style={{ marginLeft: 4, marginRight: 15 }}
              />
            )}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              <ActionName>{action.command}</ActionName>
            </div>
            <EllipsisVertical size={20} />
          </Action>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          <PlusButton
            onClick={() => {
              setEditAction(false);
              setClickedPosition(index + 1);
              setIsOpen(true);
            }}
          >
            <PlusLg size={15} color="#fff" />
          </PlusButton>
        </div>
      ))}
      <NewActionModal
        onClose={close}
        isOpen={isOpen}
        onAdd={(item: Pipeline) => {
          setSelectedAction(item);
          setIsSetupActionModalOpen(true);
        }}
      />
      <SetupActionModal
        onClose={() => setIsSetupActionModalOpen(false)}
        isOpen={isSetupActionModalOpen}
        onAddThisAction={onAddNewAction}
        selectedAction={selectedAction!}
        editAction={editAction}
        onSaveChanges={() => {
          setIsSetupActionModalOpen(false);
        }}
      />
    </div>
  );
};

Composer.defaultProps = {
  actions: [],
};

export default Composer;
