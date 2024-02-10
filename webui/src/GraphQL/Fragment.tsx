import { gql } from "@apollo/client";

export const ProjectFragment = gql`
  fragment ProjectFragment on Project {
    id
    name
    path
    createdAt
  }
`;

export const LogFragment = gql`
  fragment LogFragment on Log {
    id
    message
    createdAt
  }
`;

export const JobFragment = gql`
  fragment JobFragment on Job {
    id
    projectId
    name
  }
`;
