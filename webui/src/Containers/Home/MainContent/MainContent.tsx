import { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import styled from "@emotion/styled";
import { CollectionPlay, PlusLg } from "@styled-icons/bootstrap";
import { SettingsOutline } from "@styled-icons/evaicons-outline";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { Grid } from "@chakra-ui/react";
import { Input } from "baseui/input";
import { PackageIcon } from "@styled-icons/feather";
import { Download } from "@styled-icons/remix-line";

const BASE_URL = "https://api.fluentci.io/v1";
const filters = [
  "bazel_pipeline",
  "buf_pipeline",
  "atlas_pipeline",
  "terraform_pipeline",
  "deno_pipeline",
  "android_pipeline",
  "fastlane_pipeline",
  "elixir_pipeline",
  "symfony_pipeline",
  "laravel_pipeline",
  "ruby_pipeline",
  "django_pipeline",
  "gradle_pipeline",
  "dotnet_pipeline",
  "bun_pipeline",
  "nodejs_pipeline",
  "gleam_pipeline",
  "php_pipeline",
  "python_pipeline",
  "swift_pipeline",
  "rust_pipeline",
  "go_pipeline",
  "zig_pipeline",
  "flutter_pipeline",
  "heroku_pipeline",
  "codecov_pipeline",
  "cloudflare_pipeline",
  "render_pipeline",
  "fly_pipeline",
  "netlify_pipeline",
  "shuttle_pipeline",
  "railway_pipeline",
  "chromatic_pipeline",
  "spin_pipeline",
  "clojure_pipeline",
  "sonar_pipeline",
  "drizzlekit_pipeline",
  "prisma_pipeline",
  "terragrunt_pipeline",
  "pulumi_pipeline",
  "wiremock_pipeline",
  "trivy_pipeline",
  "snyk_pipeline",
  "grype_pipeline",
  "syft_pipeline",
  "github_pipeline",
  "gitlab_pipeline",
  "firebase_pipeline",
  "supabase_pipeline",
  "aws_sls_pipeline",
  "wasmer_pipeline",
  "terraform_docs_pipeline",
  "gitleaks_pipeline",
  "microcks_pipeline",
  "flakestry_pipeline",
  "scorecard_pipeline",
  "conftest_pipeline",
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0 auto;
  margin-top: 60px;
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
`;

const RunButton = styled.button`
  height: 40px;
  background-color: #24ffb5;
  color: #000;
  border: none;
  font-weight: 600;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #18d193;
  }
`;

const PlusButton = styled.button`
  height: 30px;
  width: 30px;
  background-color: initial;
  border-style: none;
  border: 1px solid #5324ffa3;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  box-shadow: 2px 4px #5324ff20;
`;

const ConnectorContainer = styled.div`
  width: 30px;
  margin-left: 25px;
`;

const Connector = styled.div`
  height: 50px;
  width: 1px;
  background-color: #5324ffa3;
  margin: 0 auto;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #5324ffa3;
  height: 78px;
  box-shadow: 2px 4px #5324ff20;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
`;

const ActionName = styled.div`
  color: #fff;
`;

const Inner = styled.div`
  cursor: pointer;
  height: 150px;
  border: 1px solid #5324ffa3;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: column;
  position: relative;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #24ffb5;
  height: 40px;
  position: absolute;
  bottom: 0;
  width: calc(100% - 54px);
  padding-right: 20px;
  padding-left: 20px;
  font-size: 13px;
`;

export type MainContentProps = {
  id: string;
  title: string;
  onRun: (id: string) => void;
};

const MainContent: FC<MainContentProps> = (props) => {
  const { id, title, onRun } = props;
  const [activeKey, setActiveKey] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [pipelines, setPipelines] = useState<{
    all: {
      id: string;
      name: string;
      description: string;
      githubUrl: string;
      logo: string;
      packageId: string;
      downloads: number;
      version: string;
      license: string;
      defaultBranch: string;
      updatedAt: string;
      comingSoon: boolean;
    }[];
  }>({ all: [] });

  useEffect(() => {
    fetch(`${BASE_URL}/pipelines?q=${filters.join(",")}`)
      .then((res) => res.json())
      .then((data) =>
        setPipelines({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          all: data.map((x: any) => ({
            id: x.id,
            name: x.name,
            description: x.description,
            githubUrl: x.github_url,
            logo: x.logo_url,
            packageId: x.name,
            downloads: x.downloads,
            version: x.version,
            license: x.license,
            defaultBranch: x.default_branch,
            updatedAt: x.updatedAt,
            comingSoon: false,
          })),
        })
      )
      .catch((err) => console.log(err));
  }, [setPipelines]);

  function close() {
    setIsOpen(false);
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <RunButton onClick={() => onRun(id)}>Run</RunButton>
      </Header>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey.toString());
        }}
        activateOnFocus
        overrides={{
          TabHighlight: {
            style: {
              backgroundColor: "#24ffb5",
            },
          },
          TabBorder: {
            style: {
              height: "0px",
            },
          },
        }}
      >
        <Tab
          title={
            <>
              <CollectionPlay size={24} />
              <span style={{ marginLeft: 15 }}>Runs</span>
            </>
          }
          overrides={{
            Tab: {
              style: ({ $isActive, $theme }) => ({
                backgroundColor: "#0f0124",
                color: $isActive ? "#24ffb5" : "#fff",
                fontFamily: $theme.primaryFontFamily,
                fontSize: "16px",
                ":hover": {
                  color: "#24ffb5",
                  backgroundColor: "#0f0124",
                },
              }),
            },
          }}
        >
          <div style={{ padding: 10, color: "#fff" }}>
            <div style={{ marginTop: 20 }}>
              <span
                style={{
                  borderRadius: 5,
                  padding: 9,
                  backgroundColor: "#24f3",
                  color: "#24ffb5",
                  fontSize: 13,
                }}
              >
                THERE'S NOTHING HERE YET BUT THAT'S OKAY
              </span>
            </div>

            <p>
              Once available, the timeline of pipeline runs will appear here
            </p>
          </div>
        </Tab>
        <Tab
          title={
            <>
              <SettingsOutline size={24} />
              <span style={{ marginLeft: 15 }}>Actions</span>
            </>
          }
          overrides={{
            Tab: {
              style: ({ $isActive, $theme }) => ({
                backgroundColor: "#0f0124",
                color: $isActive ? "#24ffb5" : "#fff",
                fontFamily: $theme.primaryFontFamily,
                fontSize: "16px",
                ":hover": {
                  color: "#24ffb5",
                  backgroundColor: "#0f0124",
                },
              }),
            },
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
          >
            <PlusButton onClick={() => setIsOpen(true)}>
              <PlusLg size={15} color="#fff" />
            </PlusButton>
            <ConnectorContainer>
              <Connector />
            </ConnectorContainer>
            <Action>
              <ActionName>Setup FluentCI</ActionName>
            </Action>
            <ConnectorContainer>
              <Connector />
            </ConnectorContainer>
            <PlusButton>
              <PlusLg size={15} color="#fff" />
            </PlusButton>
            <ConnectorContainer>
              <Connector />
            </ConnectorContainer>
            <Action>
              <ActionName>Test & Build</ActionName>
            </Action>
            <ConnectorContainer>
              <Connector />
            </ConnectorContainer>
            <PlusButton>
              <PlusLg size={15} color="#fff" />
            </PlusButton>
          </div>
        </Tab>
      </Tabs>

      <Modal
        onClose={close}
        isOpen={isOpen}
        size={"auto"}
        overrides={{
          Dialog: {
            style: ({ $theme }) => ({
              backgroundColor: "#0f0124",
              color: "#fff",
              fontFamily: $theme.primaryFontFamily,
            }),
          },
          Close: {
            style: {
              color: "#fff",
            },
          },
        }}
      >
        <ModalHeader>
          <Input
            onChange={() => {}}
            placeholder="Search"
            clearOnEscape
            overrides={{
              Root: {
                style: {
                  border: "none",
                },
              },
              Input: {
                style: {
                  color: "#fff",
                  backgroundColor: "#0f0124",
                  border: "none !important",
                  outline: "none",
                  caretColor: "#fff",
                },
              },
              InputContainer: {
                style: {
                  outline: "none",
                  border: "none !important",
                },
              },
            }}
          />
        </ModalHeader>
        <ModalBody
          style={{
            margin: 0,
          }}
        >
          <div
            style={{
              height: "60vh",
              width: "60vw",
              color: "#fff",
              fontFamily: "Lexend",
              padding: 20,
              overflowY: "auto",
            }}
          >
            <Grid templateColumns="repeat(4, 1fr)" gap={20}>
              {pipelines.all.map((pipeline) => (
                <Inner key={pipeline.id}>
                  {!pipeline.logo && (
                    <PackageIcon
                      size={35}
                      color="#fff"
                      style={{ marginBottom: 10, padding: 5 }}
                    />
                  )}
                  {pipeline.logo && (
                    <img
                      src={pipeline.logo}
                      alt={pipeline.name}
                      style={{
                        backgroundColor:
                          pipeline.name.startsWith("deno") ||
                          pipeline.name.startsWith("github") ||
                          pipeline.name.startsWith("rust") ||
                          pipeline.name.startsWith("trivy") ||
                          pipeline.name.startsWith("symfony") ||
                          pipeline.name.startsWith("flakestry") ||
                          pipeline.name.startsWith("symfony") ||
                          pipeline.name.startsWith("heroku") ||
                          pipeline.name.startsWith("django") ||
                          pipeline.name.startsWith("terraform")
                            ? "#fff"
                            : "initial",
                        maxWidth: 35,
                        borderRadius: 2,
                        marginBottom: 10,
                        padding: 5,
                      }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>
                      {pipeline.name.replace("_pipeline", "")}
                    </div>
                  </div>
                  <CardFooter>
                    <Download size="18" style={{ marginRight: 5 }} />{" "}
                    {pipeline.downloads}
                  </CardFooter>
                </Inner>
              ))}
            </Grid>
          </div>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default MainContent;
