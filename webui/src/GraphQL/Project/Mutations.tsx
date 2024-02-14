import { gql } from "@apollo/client";

export const RUN_PIPELNE = gql`
  mutation RunPipeline($projectId: ID) {
    runPipeline(projectId: $projectId) {
      id
      name
      path
      createdAt
    }
  }
`;
