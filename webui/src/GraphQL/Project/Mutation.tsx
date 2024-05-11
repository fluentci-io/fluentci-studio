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
