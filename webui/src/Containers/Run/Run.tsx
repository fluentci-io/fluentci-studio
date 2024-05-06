import { FC, useState } from "react";
import { Accordion, Panel } from "baseui/accordion";
import Header from "../../Components/Header";
import { Action, Container, Wrapper } from "./styles";
import { ChevronRight, ChevronDown } from "@styled-icons/boxicons-solid";
import _ from "lodash";
import LogsViewer from "../../Components/LogsViewer";

const actions = [
  {
    name: "Test",
    duration: "5s",
  },
  {
    name: "Build",
    duration: "3m 46s",
  },
  {
    name: "Deploy",
    duration: "7m 53s",
  },
];

const Run: FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
  return (
    <Wrapper>
      <Container>
        <Header title="Run: #5" />
        <Accordion
          onChange={({ expanded }) => {
            console.log(">>", expanded);
            setExpandedIndex(_.get(expanded, "0", null) as string | null);
          }}
          accordion
          overrides={{
            Header: {
              style: {
                backgroundColor: "#0f0124",
                fontFamily: "Lexend",
                height: "40px",
              },
            },
            ToggleIcon: {
              style: {
                display: "none",
              },
            },
            Content: {
              style: {
                backgroundColor: "#0f0124",
                fontFamily: "Lexend",
              },
            },
          }}
        >
          {actions.map((item, key) => (
            <Panel
              key={key}
              title={
                <Action>
                  {key.toString() != expandedIndex! && (
                    <ChevronRight size={24} style={{ marginRight: 15 }} />
                  )}
                  {key.toString() == expandedIndex! && (
                    <ChevronDown size={24} style={{ marginRight: 15 }} />
                  )}
                  <div style={{ flex: 1, display: "flex" }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#ffffffb8" }}>
                    {item.duration}
                  </div>
                </Action>
              }
            >
              <LogsViewer />
            </Panel>
          ))}
        </Accordion>
      </Container>
    </Wrapper>
  );
};

export default Run;
