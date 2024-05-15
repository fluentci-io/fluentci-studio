/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import Runs from "./Runs";
import { useCountRunsQuery, useGetRunsQuery } from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { useRecoilState } from "recoil";
import { PaginationState } from "./PaginationState";

const WS_URL = `ws://${
  location.host.endsWith(":5173") ? "localhost:6076" : location.host
}`;

const RunsWithData: FC = () => {
  const { id } = useParams();
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
  const [pagination, setPagination] = useRecoilState(PaginationState);
  const { data: countRunsData } = useCountRunsQuery({
    variables: {
      projectId: id!,
    },
  });
  const { data, refetch, loading } = useGetRunsQuery({
    variables: {
      projectId: id!,
      skip: (pagination.currentPage - 1) * pagination.limit,
      limit: pagination.limit,
    },
  });

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  useEffect(() => {
    if (countRunsData) {
      setPagination((prev) => ({
        ...prev,
        numPages: Math.ceil(countRunsData.countRuns / pagination.limit),
      }));
    }
  }, [countRunsData]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (lastJsonMessage?.channel === "run") {
      refetch();
    }
  }, [lastJsonMessage]);

  return (
    <Runs
      data={data?.getRuns || []}
      pagination={pagination}
      setCurrentPage={setCurrentPage}
      loading={loading}
      total={countRunsData?.countRuns || 0}
    />
  );
};

export default RunsWithData;
