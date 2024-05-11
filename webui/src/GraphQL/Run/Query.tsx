import { gql } from "@apollo/client";
import { RunFragment } from "../Fragment";

export const GET_RUN = gql`
  query GetRun($id: ID!) {
    getRun(id: $id) {
      ...RunFragment
    }
  }
  ${RunFragment}
`;

export const GET_RUNS = gql`
  query GetRuns($projectId: ID!, $cursor: String, $limit: Int) {
    getRuns(projectId: $projectId, cursor: $cursor, limit: $limit) {
      ...RunFragment
    }
  }
  ${RunFragment}
`;
