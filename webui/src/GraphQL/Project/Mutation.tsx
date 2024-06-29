import { gql } from "@apollo/client";
import { ProjectFragment } from "../Fragment";

export const CREATE_PROJECT = gql`
  mutation CreateProject {
    createProject {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String
    $description: String
    $tags: String
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      tags: $tags
    ) {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;
