import { FC, useEffect } from "react";
import Runs from "./Runs";
import { useGetRunsQuery } from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

const WS_URL = `ws://${
  location.host.endsWith(":5173") ? "localhost:6076" : location.host
}`;

const RunsWithData: FC = () => {
  const { id } = useParams();
  const { lastJsonMessage, readyState } = useWebSocket<{
    channel: string;
    data: Record<string, unknown>;
  }>(WS_URL, {
    shouldReconnect: () => true,
  });
  const { data, refetch } = useGetRunsQuery({
    variables: {
      projectId: id!,
    },
  });

  console.log(">> ws", readyState, lastJsonMessage);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastJsonMessage?.channel === "run") {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return <Runs data={data?.getRuns || []} />;
};

export default RunsWithData;
