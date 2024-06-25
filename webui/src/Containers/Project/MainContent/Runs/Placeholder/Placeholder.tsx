import { FC } from "react";
import { Container, Text, Clipboard } from "./styles";
import { Project } from "../../../../../Hooks/GraphQL";
import { Terminal, Github } from "@styled-icons/bootstrap";
import { Copy } from "@styled-icons/ionicons-outline";
import copyToClipboard from "copy-to-clipboard";
import { Link } from "react-router-dom";

export type PlaceholderProps = {
  data?: Project | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orgs?: any[];
  projectId?: string;
};

const Placeholder: FC<PlaceholderProps> = (props) => {
  const command =
    location.host === "app.fluentci.io"
      ? `FLUENTCI_PROJECT_ID=${props.data?.name} fluentci run --remote-exec .`
      : `FLUENTCI_PROJECT_ID=${props.data?.name} fluentci run .`;
  return (
    <Container>
      {props.data?.path !== "empty" && (
        <>
          <div style={{ marginTop: 20 }}>
            <Text>THERE'S NOTHING HERE YET BUT THAT'S OKAY</Text>
          </div>

          <p>Once available, the timeline of pipeline runs will appear here</p>
        </>
      )}
      {props.data?.path === "empty" && (
        <>
          <div style={{ display: "flex", padding: 20 }}>
            <div style={{ marginRight: 20 }}>
              <Terminal size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>
                Finish setting up your project
              </div>
              <div style={{ fontSize: 14, color: "#7392b1" }}>
                Run the following command in your project directory to finish
                project setup :
                <br />
                <br />
              </div>
              <code
                style={{
                  padding: 10,
                  backgroundColor: "#190832",
                  borderRadius: 3,
                }}
              >
                <span>{command}</span>
                <Clipboard onClick={() => copyToClipboard(command)}>
                  <Copy size={20} color="#fff" />
                </Clipboard>
              </code>
            </div>
          </div>
          <>
            <div style={{ marginLeft: 60, marginTop: 20, marginBottom: 20 }}>
              OR
            </div>
            <div
              style={{
                marginLeft: 60,
              }}
            >
              {
                <>
                  {props.orgs!.length > 0 && (
                    <Link
                      to={`/link-project/${props.projectId}`}
                      style={{
                        color: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                          justifyContent: "center",
                          backgroundColor: "#5a00e1",
                          maxWidth: 411,
                          borderRadius: 6,
                          height: 48,
                        }}
                      >
                        <div style={{ marginTop: 10 }}>
                          <Github size={22} color={"#fff"} />
                        </div>
                        <div
                          style={{
                            marginLeft: 15,
                            marginTop: 13,
                            fontSize: 15,
                          }}
                        >
                          Link your GitHub Repository
                        </div>
                      </div>
                    </Link>
                  )}
                  {props.orgs!.length === 0 && (
                    <a
                      href="https://github.com/apps/fluentci-io/installations/new"
                      style={{
                        color: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                          justifyContent: "center",
                          backgroundColor: "#5a00e1",
                          maxWidth: 411,
                          borderRadius: 6,
                          height: 48,
                        }}
                      >
                        <div style={{ marginTop: 10 }}>
                          <Github size={22} color={"#fff"} />
                        </div>
                        <div
                          style={{
                            marginLeft: 15,
                            marginTop: 13,
                            fontSize: 15,
                          }}
                        >
                          Link your GitHub Repository
                        </div>
                      </div>
                    </a>
                  )}
                </>
              }
            </div>
          </>
        </>
      )}
    </Container>
  );
};

export default Placeholder;
