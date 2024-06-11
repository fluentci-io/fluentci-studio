import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import MainContent from "./MainContent";
import Titlebar from "../../Components/Titlebar";
import Loading from "./Loading";
import { useRecoilState } from "recoil";
import { HomeState } from "./HomeState";
import Navbar from "../../Components/Navbar";

const Container = styled.div`
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Home: FC = () => {
  const [{ loading }, setState] = useRecoilState(HomeState);

  const setLoading = (loading: boolean) => {
    setState({ loading });
  };

  useEffect(() => {
    if (!location.host) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ipcRenderer.on(
        "setup-deno",
        (data: { message: string; done: boolean }) => {
          setLoading(data.done);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Titlebar />
      <Container>
        <Navbar />
        {!location.host && loading && <Loading />}
        {!location.host && !loading && <MainContent />}
        {location.host && <MainContent />}
      </Container>
    </>
  );
};

export default Home;
