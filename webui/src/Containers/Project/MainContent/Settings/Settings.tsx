import { BaseSyntheticEvent, FC } from "react";
import styles, {
  Title,
  Text,
  Label,
  Section,
  Cluster,
  ClusterStart,
  SaveButton,
  Row,
  UnlinkButton,
  LinkGithubRepo,
} from "./styles";
import { Input } from "baseui/input";
import { Controller, useFormContext } from "react-hook-form";
import { Account, Organization, Repository } from "../../../../Hooks/GraphQL";
import { Spinner } from "baseui/spinner";
import { Github } from "@styled-icons/bootstrap";
import { Link } from "react-router-dom";

export type SettingsProps = {
  loading: boolean;
  me?: Account | null;
  handleSubmit: (e: BaseSyntheticEvent) => void;
  linkedRepository?: Repository | null;
  onUnlinkRepository: (id: string) => Promise<void>;
  loadingLinkedRepository: boolean;
  projectId?: string;
  orgs: Organization[];
  displayRepositorySection: boolean;
  loadingUnlink: boolean;
};

const Settings: FC<SettingsProps> = ({
  handleSubmit,
  me,
  loading,
  linkedRepository,
  loadingLinkedRepository,
  projectId,
  orgs,
  onUnlinkRepository,
  displayRepositorySection,
  loadingUnlink,
}) => {
  const { control, watch } = useFormContext();
  const name = watch("name");
  return (
    <>
      <Section>
        <Title>General</Title>
        <Text>
          Here you can change the name and description of your project
          (pipeline), or even decide to share it with the rest of the world.
        </Text>
      </Section>
      {!!me && (
        <Section>
          <Label>Cluster size</Label>
          <Cluster>
            <ClusterStart>FL-10</ClusterStart>
            <div style={{ padding: 6, textAlign: "center" }}>
              6 vCPU &middot; 16GB memory
            </div>
          </Cluster>
        </Section>
      )}
      <Section>
        <Label>
          Name{" "}
          <span style={{ color: "#ffffff71", fontWeight: 500 }}>
            {" "}
            - Required
          </span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Example: Deploy to production"
              overrides={styles.Input}
              error={!name?.trim().length}
            />
          )}
        />
      </Section>
      <Section>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input {...field} overrides={styles.Input} />}
        />
      </Section>
      <Section>
        <Label>Tags</Label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <Input {...field} overrides={styles.Input} />}
        />
        <Text style={{ marginTop: 5 }}>
          Short words to categorize this pipeline. Separate multiple tags with a
          comma
        </Text>
      </Section>
      {!loading && <SaveButton onClick={handleSubmit}>Save</SaveButton>}
      {loading && (
        <SaveButton>
          <Spinner $size={"15px"} $borderWidth={"3px"} style={styles.Spinner} />
        </SaveButton>
      )}
      {displayRepositorySection && (
        <Section style={{ marginTop: 42 }}>
          <Label>Repository</Label>
          {!loadingLinkedRepository && linkedRepository && (
            <>
              <Row style={{ padding: 10 }}>
                <Github size={20} color="#fff" />
                <a
                  href={linkedRepository.repoUrl}
                  style={{ color: "#fff", marginLeft: 10, flex: 1 }}
                  target="_blank"
                >
                  {linkedRepository.repoUrl}
                </a>
                <UnlinkButton
                  onClick={() => onUnlinkRepository(linkedRepository.name)}
                >
                  {!loadingUnlink && <div>Unlink repository</div>}
                  {loadingUnlink && (
                    <Spinner
                      $size={"15px"}
                      $borderWidth={"3px"}
                      style={styles.Spinner}
                    />
                  )}
                </UnlinkButton>
              </Row>
            </>
          )}
          {!loadingLinkedRepository && !linkedRepository && (
            <>
              <Text style={{ marginTop: 10 }}>
                Link your GitHub repository to start running pipelines on every
                push to your repository.
              </Text>
              {orgs.length > 0 && (
                <Link
                  to={`/link-project/${projectId}`}
                  style={{
                    color: "#fff",
                  }}
                >
                  <LinkGithubRepo style={{ marginTop: 25 }}>
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
                  </LinkGithubRepo>
                </Link>
              )}
              {orgs.length === 0 && (
                <a
                  href="https://github.com/apps/fluentci-io/installations/new"
                  style={{ color: "#fff" }}
                >
                  <LinkGithubRepo style={{ marginTop: 25 }}>
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
                  </LinkGithubRepo>
                </a>
              )}
            </>
          )}
        </Section>
      )}
    </>
  );
};

export default Settings;
