import { gql } from "@apollo/client";
import { ActionFragment } from "../Fragment";

export const GET_ACTIONS = gql`
  query GetActions($projectId: ID!) {
    actions(projectId: $projectId) {
      ...ActionFragment
    }
  }
  ${ActionFragment}
`;
