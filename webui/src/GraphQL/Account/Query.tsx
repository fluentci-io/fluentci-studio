import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      createdAt
      github
      name
      picture
    }
  }
`;
