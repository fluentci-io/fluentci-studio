import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import Titlebar from "../../Components/Titlebar";
import Navbar from "../../Components/Navbar";
import MainContent from "./MainContent";
import AskAI from "../../Components/AskAI";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const LinkProject: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if (!id || !navigate) {
      return;
    }
    const fromNewProject = localStorage.getItem("redirected_from_new_project");
    if (fromNewProject) {
      localStorage.removeItem("redirected_from_new_project");
      navigate(`/project/${id}`);
    }
  }, [navigate, id]);

  return (
    <>
      <Titlebar />
      <Container>
        <Navbar />
        <MainContent />
        <AskAI />
      </Container>
    </>
  );
};

export default LinkProject;
