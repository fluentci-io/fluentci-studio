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
  Row,
  Visibility,
  Tag,
} from "./styles";
import { Project } from "../../../Hooks/GraphQL";
import { Link } from "react-router-dom";
import BuildHistory from "./BuildHistory";
import _ from "lodash";

export type MainContentProps = {
  projects?: Project[];
  onNewProject: () => void;
  displayNewProjectButton: boolean;
};

const MainContent: FC<MainContentProps> = (props) => {
  const { projects, onNewProject } = props;
  return (
    <div>
      <Container>
        <Header>
          <Title>Projects</Title>
          {props.displayNewProjectButton && (
            <RunButton onClick={onNewProject}>New Project</RunButton>
          )}
        </Header>
        {projects!.map((item, index) => (
          <div key={index} style={{ marginBottom: 25, position: "relative" }}>
            <ProjectWrapper>
              <PictureWrapper>
                <Picture src={item.picture} />
              </PictureWrapper>
              <div style={{ width: "calc(50% - 40px)" }}>
                <Link to={`/project/${item.id}`} style={{ color: "#fff" }}>
                  <Row>
                    <div>{item.displayName || item.name}</div>
                    {item.isPrivate === false && (
                      <Visibility>Public</Visibility>
                    )}
                  </Row>
                  {item.path !== "empty" && !!item.path && (
                    <Path>{item.path}</Path>
                  )}
                </Link>
                <div>
                  {item.tags?.map((tag) => (
                    <Tag>{tag}</Tag>
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
          </div>
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
