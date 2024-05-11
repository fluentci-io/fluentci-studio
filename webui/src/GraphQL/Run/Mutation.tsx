import { gql } from "@apollo/client";
import { RunFragment } from "../Fragment";

export const RUN_PIPELNE = gql`
  mutation RunPipeline($projectId: ID!) {
    runPipeline(projectId: $projectId) {
      ...RunFragment
    }
  }
  ${RunFragment}
`;
