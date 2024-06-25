import { FC, useEffect } from "react";
import Repositories from "./Repositories";
import { repositories } from "./mocks";
import { useRecoilState, useRecoilValue } from "recoil";
import { RepositoriesState } from "./RepositoriesState";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { useGetRepositoriesQuery } from "../../../../Hooks/GraphQL";
import { OrganizationsState } from "../Organizations/OrganizationsState";

const RepositoriesWithData: FC = () => {
  const { current } = useRecoilValue(OrganizationsState);
  const { data, refetch } = useGetRepositoriesQuery({
    variables: {
      provider: "GitHub",
      organization: _.get(current, "0.label", ""),
    },
  });
  const [repos, setRepos] = useRecoilState(RepositoriesState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      return;
    }
    setRepos(
      data.repositories.map((x) => ({
        id: x.id,
        full_name: x.name,
        private: x.isPrivate,
      }))
    );
  }, [setRepos, data]);

  useEffect(() => {
    refetch({
      provider: "GitHub",
      organization: _.get(current, "0.label", ""),
    });
  }, [current, refetch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLink = (value: any) => {
    console.log(value);
    navigate(`/project/${id}`);
  };

  const onSearch = (keyword: string) => {
    const data = [...repositories];
    data.reverse();
    if (!keyword) {
      setRepos(data);
      return;
    }
    setRepos(
      _.filter(data, _.method("full_name.match", new RegExp(keyword, "i")))
    );
  };

  return <Repositories repos={repos} onLink={onLink} onSearch={onSearch} />;
};

export default RepositoriesWithData;
