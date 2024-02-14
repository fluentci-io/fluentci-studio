import { gql } from "@apollo/client";
import { ProjectFragment } from "../Fragment";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      path
      createdAt
      logs {
        id
        message
      }
    }
  }
`;
