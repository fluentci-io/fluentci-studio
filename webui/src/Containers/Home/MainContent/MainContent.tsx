import { FC } from "react";
import {
  Container,
  RunButton,
  Header,
  Title,
  ProjectWrapper,
  Picture,
  PictureWrapper,
  Path,
} from "./styles";
import { Project } from "../../../Hooks/GraphQL";
import { Link } from "react-router-dom";
import BuildHistory from "./BuildHistory";
import _ from "lodash";

export type MainContentProps = {
  projects?: Project[];
  onNewProject: () => void;
};

const MainContent: FC<MainContentProps> = (props) => {
  const { projects, onNewProject } = props;
  return (
    <div>
      <Container>
        <Header>
          <Title>Projects</Title>
          <RunButton onClick={onNewProject}>New Project</RunButton>
        </Header>
        {projects!.map((item, index) => (
          <Link
            to={`/project/${item.id}`}
            key={index}
            style={{ marginBottom: 25, position: "relative" }}
          >
            <ProjectWrapper>
              <PictureWrapper>
                <Picture src={item.picture} />
              </PictureWrapper>
              <div style={{ width: "calc(50% - 40px)" }}>
                <div>{item.displayName || item.name}</div>
                {item.path !== "empty" && !!item.path && (
                  <Path>{item.path}</Path>
                )}
                <div>
                  {item.tags?.map((tag) => (
                    <span
                      style={{
                        fontSize: 11,
                        color: "#00f9ed",
                        backgroundColor: "#00f9ec1c",
                        padding: 4,
                        paddingLeft: 6,
                        paddingRight: 6,
                        borderRadius: 14,
                        marginRight: 5,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {_.get(item, "recentRuns.0.status") && (
                <BuildHistory
                  status={_.last(item.recentRuns)?.status || "PENDING"}
                  reliability={item.reliability || 0}
                  speed={item.speed || 0}
                  buildsPerWeek={item.buildsPerWeek || 0}
                  builds={
                    Array.from(Array(18).keys()).map((i) => ({
                      status: _.get(item, `recentRuns.${i}.status`, ""),
                      duration: _.get(item, `recentRuns.${i}.duration`, 0),
                    })) || []
                  }
                />
              )}
            </ProjectWrapper>
          </Link>
        ))}
      </Container>
      <div style={{ height: 100 }} />
    </div>
  );
};

MainContent.defaultProps = {
  projects: [],
};

export default MainContent;
