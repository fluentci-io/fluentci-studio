import { FC, useEffect } from "react";
import Runs from "./Runs";
import { useGetRunsQuery } from "../../../../Hooks/GraphQL";
import { useParams } from "react-router-dom";

const RunsWithData: FC = () => {
  const { id } = useParams();
  const { data, refetch } = useGetRunsQuery({
    variables: {
      projectId: id!,
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Runs data={data?.getRuns || []} />;
};

export default RunsWithData;
