import { FC, useEffect } from "react";
import MainContent from "./MainContent";
import { useGetProjectsQuery } from "../../../Hooks/GraphQL";
import useWebSocket from "react-use-websocket";

const WS_URL = `ws://${
  location.host.endsWith(":5173") ? "localhost:6076" : location.host
}`;

const MainContentWithData: FC = () => {
  const { lastJsonMessage } = useWebSocket<{
    channel: string;
    data: Record<string, unknown>;
  }>(WS_URL, {
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

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return <MainContent projects={data?.projects} />;
};

export default MainContentWithData;
