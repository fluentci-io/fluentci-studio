import { FC, useState } from "react";
import { PlusLg } from "@styled-icons/bootstrap";
import styled from "@emotion/styled";
import { Terminal } from "@styled-icons/bootstrap";
import NewActionModal from "./NewActionModal";
import SetupActionModal from "./SetupActionModal";
import { Pipeline } from "./NewActionModal/NewActionModalWithData";

const PlusButton = styled.button`
  height: 30px;
  width: 30px;
  background-color: initial;
  border-style: none;
  border: 1px solid #5324ffa3;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  box-shadow: 2px 4px #5324ff20;
`;

const ConnectorContainer = styled.div`
  width: 30px;
  margin-left: 25px;
`;

const Connector = styled.div`
  height: 50px;
  width: 1px;
  background-color: #5324ffa3;
  margin: 0 auto;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #5324ffa3;
  height: 78px;
  box-shadow: 2px 4px #5324ff20;
  padding-left: 18px;
  padding-right: 18px;
  cursor: pointer;
`;

const ActionName = styled.div`
  color: #fff;
`;

export type Action = {
  id: string;
  name: string;
  command: string;
  logo?: string;
};

export type ComposerProps = {
  actions: Action[];
};

const Composer: FC<ComposerProps> = (props) => {
  const [actions, setActions] = useState<Action[]>(props.actions);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Pipeline | null>(null);
  const [isSetupActionModalOpen, setIsSetupActionModalOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function onAddNewAction(item: Action) {
    setIsOpen(false);
    setTimeout(() => setIsSetupActionModalOpen(false), 50);
    setActions([...actions, item]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
      <PlusButton onClick={() => setIsOpen(true)}>
        <PlusLg size={15} color="#fff" />
      </PlusButton>
      {actions.map((action) => (
        <div key={action.id}>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          <Action>
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
            <ActionName>{action.command}</ActionName>
          </Action>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          <PlusButton onClick={() => setIsOpen(true)}>
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
      />
    </div>
  );
};

Composer.defaultProps = {
  actions: [],
};

export default Composer;
