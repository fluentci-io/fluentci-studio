import { FC, useEffect, useState } from "react";
import Placeholder from "./Placeholder";
import { useParams } from "react-router-dom";
import {
  Repository,
  useGetLinkedRepositoryLazyQuery,
  useGetProjectQuery,
} from "../../../../../Hooks/GraphQL";
import { AuthState } from "../../../../Auth/AuthState";
import { useRecoilValue } from "recoil";

export const PlaceholderWithData: FC = () => {
  const { id } = useParams();
  const me = useRecoilValue(AuthState);
  const [linkedRepository, setLinkedRepository] = useState<
    Repository | null | undefined
  >(null);
  const { data, loading } = useGetProjectQuery({
    variables: {
      id: id!,
    },
    fetchPolicy: "network-only",
  });
  const [getLinkedRepository] = useGetLinkedRepositoryLazyQuery();

  useEffect(() => {
    if (!me || !id) {
      return;
    }
    getLinkedRepository({
      variables: {
        projectId: id!,
      },
    }).then((res) => setLinkedRepository(res.data?.linkedRepository));
  }, [me, getLinkedRepository, id]);

  return (
    <>
      {!loading && (
        <Placeholder
          data={data?.project}
          me={me}
          linkedRepository={linkedRepository}
        />
      )}
    </>
  );
};

export default PlaceholderWithData;
