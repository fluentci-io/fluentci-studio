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
    name
    createdAt
    projectId
    status
  }
`;

export const RunFragment = gql`
  fragment RunFragment on Run {
    id
    branch
    commit
    date
    project
    projectId
    duration
    jobs {
      id
      name
      createdAt
      projectId
      status
    }
    message
    name
    title
    cursor
    status
  }
`;

export const ActionFragment = gql`
  fragment ActionFragment on Action {
    id
    commands
    enabled
    logo
    name
    plugin
    useWasm
  }
`;
