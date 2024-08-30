import { FC, useState } from "react";
import MainContent from "./MainContent";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  useCreateProjectMutation,
  useGetOrganizationsLazyQuery,
} from "../../../Hooks/GraphQL";
import { useNavigate } from "react-router-dom";

const chakraTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Lexend, sans-serif",
    heading: "Lexend, serif",
    mono: "Menlo, monospace",
  },
  colors: {
    background: "red",
  },
});

const MainContentWithData: FC = () => {
  const navigate = useNavigate();
  const [createProject] = useCreateProjectMutation();
  const [getOrganizations] = useGetOrganizationsLazyQuery({
    variables: {
      provider: "GitHub",
    },
  });

  const [loading, setLoading] = useState<string | undefined | null>(null);
  const onNewProject = async (example?: { id: string; repoUrl: string }) => {
    if (window.location.href.includes("app.fluentci.io")) {
      const response = await getOrganizations();
      if ((response.data?.organizations || []).length === 0) {
        await createProject();
        localStorage.setItem("redirected_from_new_project", "1");
        window.location.href =
          "https://github.com/apps/fluentci-io/installations/new";
        return;
      }
    }

    setLoading(example?.id);
    const response = await createProject({
      variables: {
        fromRepository: example?.repoUrl,
      },
    });
    setLoading(null);
    navigate(`/project/${response.data?.createProject?.id}`);
  };

  return (
    <ChakraProvider theme={chakraTheme}>
      <MainContent onNewProject={onNewProject} loading={loading} />
    </ChakraProvider>
  );
};

export default MainContentWithData;
