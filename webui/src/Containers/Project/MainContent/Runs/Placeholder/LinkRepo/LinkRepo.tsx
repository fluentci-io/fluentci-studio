import { FC } from "react";
import { Link } from "react-router-dom";
import { Github } from "@styled-icons/bootstrap";

export type LinkRepoProps = {
  projectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orgs?: any[];
};

const LinkRepo: FC<LinkRepoProps> = (props) => {
  return (
    <>
      <div style={{ marginLeft: 60, marginTop: 20, marginBottom: 20 }}>OR</div>
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
  );
};

export default LinkRepo;
