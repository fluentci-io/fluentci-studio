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
};

const MainContent: FC<MainContentProps> = (props) => {
  const { projects } = props;
  return (
    <Container>
      <Header>
        <Title>Projects</Title>
        <RunButton>New Project</RunButton>
      </Header>
      {projects!.map((item, index) => (
        <Link
          to={`/project/${item.id}`}
          key={index}
          style={{ marginBottom: 25 }}
        >
          <ProjectWrapper>
            <PictureWrapper>
              <Picture src={item.picture} />
            </PictureWrapper>
            <div style={{ width: "calc(50% - 40px)" }}>
              <div>{item.name}</div>
              <Path>{item.path}</Path>
            </div>
            {_.get(item, "recentRuns.0.status") && (
              <BuildHistory
                status="SUCCESS"
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
  );
};

MainContent.defaultProps = {
  projects: [],
};

export default MainContent;
