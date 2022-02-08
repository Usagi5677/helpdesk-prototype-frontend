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

export const ADD_CATEGORY = gql`
  mutation ($name: String!) {
    createCategory(name: $name)
  }
`;

export const EDIT_CATEGORY = gql`
  mutation ($id: Int!, $name: String!) {
    changeCategoryName(id: $id, name: $name)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation ($id: Int!) {
    deleteCategory(id: $id)
  }
`;
