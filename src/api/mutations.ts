import { gql } from "@apollo/client";

export const ADD_APP_USER = gql`
  mutation addAppUser($userId: String!, $roles: [Role!]!) {
    addAppUser(userId: $userId, roles: $roles)
  }
`;

export const REMOVE_USER_ROLE = gql`
  mutation ($userId: Int!, $role: Role!) {
    removeUserRole(userId: $userId, role: $role)
  }
`;
