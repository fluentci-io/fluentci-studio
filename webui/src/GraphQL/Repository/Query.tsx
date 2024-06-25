import { gql } from "@apollo/client";
import { RepositoryFragment } from "../Fragment";

export const GET_REPOSITORIES = gql`
  query GetRepositories($provider: String!, $organization: String!) {
    repositories(provider: $provider, organization: $organization) {
      ...RepositoryFragment
    }
  }
  ${RepositoryFragment}
`;
