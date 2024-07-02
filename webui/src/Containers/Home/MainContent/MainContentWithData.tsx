import { FC, useEffect, useState } from "react";
import MainContent from "./MainContent";
import {
  Account,
  useCreateProjectMutation,
  useGetAccountLazyQuery,
  useGetProjectsQuery,
} from "../../../Hooks/GraphQL";
import useWebSocket from "react-use-websocket";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../Auth/AuthState";

const WS_URL = `ws://${
  location.host.endsWith(":5173")
    ? "localhost:6076"
    : location.host || "127.0.0.1:6076"
}`;

const MainContentWithData: FC = () => {
  const navigate = useNavigate();
  const { id: usernameOrOrg } = useParams();
  const me = useRecoilValue(AuthState);
  const [account, setAccount] = useState<Account | undefined | null>(null);
  const [getAccount] = useGetAccountLazyQuery();
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

  useEffect(() => {
    if (usernameOrOrg) {
      getAccount({
        variables: {
          github: usernameOrOrg,
        },
      }).then((res) => setAccount(res.data?.account));
    }
  }, [getAccount, usernameOrOrg]);

  return (
    <MainContent
      projects={data?.projects}
      onNewProject={onNewProject}
      displayNewProjectButton={
        !import.meta.env.VITE_APP_API_URL?.includes("api.fluentci.io") ||
        (me?.github === usernameOrOrg && !!usernameOrOrg) ||
        (!!me && !usernameOrOrg)
      }
      profile={account}
    />
  );
};

export default MainContentWithData;
