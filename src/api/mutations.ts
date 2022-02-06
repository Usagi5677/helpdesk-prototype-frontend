import { gql } from "@apollo/client";

export const ADD_APP_USER = gql`
  mutation addAppUser($userId: String!, $roles: [Role!]!) {
    addAppUser(userId: $userId, roles: $roles)
  }
`;
