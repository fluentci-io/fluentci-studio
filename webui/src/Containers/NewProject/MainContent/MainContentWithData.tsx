import { FC } from "react";
import MainContent from "./MainContent";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useCreateProjectMutation } from "../../../Hooks/GraphQL";
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
  const onNewProject = async () => {
    const response = await createProject();
    navigate(`/project/${response.data?.createProject?.id}`);
  };

  return (
    <ChakraProvider theme={chakraTheme}>
      <MainContent onNewProject={onNewProject} />
    </ChakraProvider>
  );
};

export default MainContentWithData;
