import { gql } from "@apollo/client";

export const RUN_JOB = gql`
  mutation RunJob($projectId: ID, $jobName: String) {
    runJob(projectId: $projectId, jobName: $jobName) {
      id
      projectId
      name
      status
      createdAt
    }
  }
`;
