import { FC, useState } from "react";
import { PlusLg } from "@styled-icons/bootstrap";
import { Terminal } from "@styled-icons/bootstrap";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import { StatefulPopover } from "baseui/popover";
import NewActionModal from "./NewActionModal";
import SetupActionModal from "./SetupActionModal";
import { Pipeline } from "./NewActionModal/NewActionModalWithData";
import {
  Action,
  ActionName,
  Connector,
  ConnectorContainer,
  PlusButton,
  PopoverButton,
} from "./styles";
import { StatefulMenu } from "baseui/menu";

export type ComposerProps = {
  actions: Pipeline[];
  setActions: (values: Pipeline[]) => void;
};

const Composer: FC<ComposerProps> = (props) => {
  const { actions, setActions } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Pipeline | null>(null);
  const [isSetupActionModalOpen, setIsSetupActionModalOpen] = useState(false);
  const [editAction, setEditAction] = useState(false);
  const [actionPosition, setActionPosition] = useState<number | null>(null);
  const [clickedPosition, setClickedPosition] = useState(0);

  function close() {
    setIsOpen(false);
  }

  function onAddNewAction(item: Pipeline) {
    setIsOpen(false);
    setIsSetupActionModalOpen(false);
    const updated = [...actions];
    updated.splice(clickedPosition, 0, item);
    setActions(updated);
  }

  function onClickAction(action: Pipeline, index: number) {
    setActionPosition(index);
    setSelectedAction(action);
    setEditAction(true);
    setIsSetupActionModalOpen(true);
  }

  function onDelete(position: number) {
    const updated = actions.filter((_, index) => index !== position);
    setActions(updated);
  }

  function onDuplicate(position: number) {
    const updated = [...actions];
    updated.splice(position, 0, actions[position]);
    setActions(updated);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
      {actions.length === 0 && (
        <PlusButton
          onClick={() => {
            setEditAction(false);
            setIsOpen(true);
            setClickedPosition(0);
          }}
        >
          <PlusLg size={15} color="#fff" />
        </PlusButton>
      )}
      {actions.map((action, index) => (
        <div key={action.id}>
          <PlusButton
            onClick={() => {
              setEditAction(false);
              setIsOpen(true);
              setClickedPosition(index);
            }}
          >
            <PlusLg size={15} color="#fff" />
          </PlusButton>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          <Action
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              if (
                (e.target as HTMLElement).closest("svg") ||
                (e.target as HTMLElement).closest("button") ||
                (e.target as HTMLElement).closest("li")
              ) {
                return;
              }
              onClickAction(action, index ? 1 : index);
            }}
          >
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
              <ActionName>
                {action.actionName || action.command?.split("\n")?.reverse()[0]}
              </ActionName>
            </div>
            <StatefulPopover
              placement="bottomRight"
              content={({ close }) => (
                <StatefulMenu
                  items={[
                    { label: <span style={{ color: "#fff" }}>Duplicate</span> },
                    {
                      label: (
                        <span style={{ color: "#ff0094" }}>Delete action</span>
                      ),
                    },
                  ]}
                  overrides={{
                    List: {
                      style: {
                        border: "1px solid rgb(71 5 94 / 29%)",
                      },
                    },
                    Option: {
                      props: {
                        overrides: {
                          ListItem: {
                            style: ({
                              $theme,
                            }: {
                              $theme: { primaryFontFamily: string };
                            }) => ({
                              fontFamily: $theme.primaryFontFamily,
                            }),
                          },
                        },
                      },
                    },
                  }}
                  onItemSelect={({
                    item,
                  }: {
                    item: { label: { props: { children: string } } };
                  }) => {
                    switch (item.label.props.children) {
                      case "Delete action":
                        onDelete(index);
                        break;
                      case "Duplicate":
                        onDuplicate(index);
                        break;
                      default:
                        break;
                    }
                    close();
                  }}
                />
              )}
              accessibilityType={"tooltip"}
            >
              <PopoverButton onClick={(e) => e.stopPropagation()}>
                <EllipsisVertical size={20} />
              </PopoverButton>
            </StatefulPopover>
          </Action>
          <ConnectorContainer>
            <Connector />
          </ConnectorContainer>
          {index === actions.length - 1 && (
            <PlusButton
              onClick={() => {
                setEditAction(false);
                setClickedPosition(index + 1);
                setIsOpen(true);
              }}
            >
              <PlusLg size={15} color="#fff" />
            </PlusButton>
          )}
        </div>
      ))}
      <NewActionModal
        onClose={close}
        isOpen={isOpen}
        onAdd={(item: Pipeline) => {
          setIsSetupActionModalOpen(true);
          setSelectedAction(item);
        }}
      />
      <SetupActionModal
        onClose={() => setIsSetupActionModalOpen(false)}
        isOpen={isSetupActionModalOpen}
        onAddThisAction={onAddNewAction}
        selectedAction={selectedAction!}
        editAction={editAction}
        actionPosition={actionPosition}
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
