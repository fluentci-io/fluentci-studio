import { FC } from "react";
import Runs from "./Runs";
import { useGetRunsQuery } from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";

const RunsWithData: FC = () => {
  const { id } = useParams();
  const { data } = useGetRunsQuery({
    variables: {
      projectId: id!,
    },
  });
  return <Runs data={data?.getRuns || []} />;
};

export default RunsWithData;
