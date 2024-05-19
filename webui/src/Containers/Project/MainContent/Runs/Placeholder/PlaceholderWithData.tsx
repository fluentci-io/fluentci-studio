import { FC } from "react";
import Placeholder from "./Placeholder";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../../../Hooks/GraphQL";

export const PlaceholderWithData: FC = () => {
  const { id } = useParams();
  const { data } = useGetProjectQuery({
    variables: {
      id: id!,
    },
  });
  return <Placeholder data={data?.project} />;
};

export default PlaceholderWithData;
