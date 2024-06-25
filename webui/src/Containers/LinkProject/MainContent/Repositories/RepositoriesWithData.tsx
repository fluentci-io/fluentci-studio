import { FC, useEffect, useState } from "react";
import Repositories from "./Repositories";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [all, setAll] = useState<any[]>([]);

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
    setAll(
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
    if (!keyword) {
      setRepos(all);
      return;
    }
    setRepos(
      _.filter(all, _.method("full_name.match", new RegExp(keyword, "i")))
    );
  };

  return <Repositories repos={repos} onLink={onLink} onSearch={onSearch} />;
};

export default RepositoriesWithData;
