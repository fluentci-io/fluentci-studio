import { FC } from "react";
import { Container, RunButton, Header, Title, ProjectWrapper } from "./styles";
import { Project } from "../../../Hooks/GraphQL";
import { Link } from "react-router-dom";

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
            <div>
              <div>{item.name}</div>
              <div style={{ fontSize: 13, color: "#14ffb5" }}>{item.path}</div>
            </div>
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
