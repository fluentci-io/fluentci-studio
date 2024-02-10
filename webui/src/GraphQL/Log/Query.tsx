import { gql } from "@apollo/client";
import { LogFragment } from "../Fragment";

export const GET_LOGS = gql`
  query GetLogs {
    logs {
      ...LogFragment
    }
  }
  ${LogFragment}
`;
