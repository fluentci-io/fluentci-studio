import { FC, useEffect } from "react";
import MainContent from "./MainContent";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "../../../Hooks/GraphQL";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../Auth/AuthState";

const WS_URL = `ws://${
  location.host.endsWith(":5173")
    ? "localhost:6076"
    : location.host || "127.0.0.1:6076"
}`;

const MainContentWithData: FC = () => {
  const navigate = useNavigate();
  const me = useRecoilValue(AuthState);
  const { lastJsonMessage } = useWebSocket<{
    channel: string;
    data: Record<string, unknown>;
  }>(me ? `wss://events.fluentci.io?s=${me.id}` : WS_URL, {
    share: true,
    shouldReconnect: () => true,
    heartbeat: {
      interval: 1,
    },
  });

  const { data, refetch } = useGetProjectsQuery({
    variables: {
      reverse: true,
    },
  });

  const [createProject] = useCreateProjectMutation();

  const onNewProject = async () => {
    const response = await createProject();
    navigate(`/project/${response.data?.createProject?.id}`);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return <MainContent projects={data?.projects} onNewProject={onNewProject} />;
};

export default MainContentWithData;
