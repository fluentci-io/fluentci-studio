import { FC } from "react";
import Placeholder from "./Placeholder";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../../../Hooks/GraphQL";

export const PlaceholderWithData: FC = () => {
  const { id } = useParams();
  const { data, loading } = useGetProjectQuery({
    variables: {
      id: id!,
    },
    fetchPolicy: "network-only",
  });
  return <>{!loading && <Placeholder data={data?.project} />}</>;
};

export default PlaceholderWithData;
