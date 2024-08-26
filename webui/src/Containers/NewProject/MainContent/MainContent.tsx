import { FC } from "react";
import {
  Container,
  Title,
  Subtitle,
  StartFromScratch,
  Card,
  CardTitle,
  Logo,
  CardHeader,
  Description,
  LinkGithubRepo,
  CardFooter,
  ForkAndRun,
} from "./styles";
import { Rocket } from "@styled-icons/boxicons-regular";
import { GithubOutline } from "@styled-icons/evaicons-outline";
import { Grid } from "@chakra-ui/react";
import { examples } from "./consts";

export type MainContentProps = {
  onNewProject: (repoUrl?: string) => Promise<void>;
};

const MainContent: FC<MainContentProps> = ({ onNewProject }) => {
  return (
    <Container>
      <Title>Let's set up a project!</Title>
      <Subtitle>Start from scratch or fork one of our examples</Subtitle>
      <StartFromScratch onClick={() => onNewProject()}>
        <Rocket size={24} color={"#fff"} style={{ marginRight: 10 }} />
        Start from scratch
      </StartFromScratch>
      <div style={{ marginTop: 30, marginBottom: 30 }}>OR</div>
      <div style={{ fontSize: 24 }}>Try a quick experiment</div>
      <Subtitle>Use one of our examples below to get started quickly</Subtitle>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={6}
        marginTop={10}
      >
        {examples.map((item) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <Logo src={item.logoUrl} />
            </CardHeader>
            <Description>{item.description}</Description>
            <CardFooter>
              <div>
                <GithubOutline
                  size={18}
                  color={"#fff"}
                  style={{ marginRight: 10 }}
                />
                <LinkGithubRepo href={item.repoUrl} target="_blank">
                  {item.repoUrl.split("/").pop()}
                </LinkGithubRepo>
              </div>
              <ForkAndRun onClick={() => onNewProject(item.repoUrl)}>
                Fork & Run
              </ForkAndRun>
            </CardFooter>
          </Card>
        ))}
      </Grid>
      <div style={{ height: 200 }}></div>
    </Container>
  );
};

export default MainContent;
