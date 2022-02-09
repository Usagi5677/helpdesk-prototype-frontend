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

export const ADD_USER_GROUP = gql`
  mutation ($name: String!, $mode: String!) {
    createUserGroup(name: $name, mode: $mode)
  }
`;

export const EDIT_USER_GROUP = gql`
  mutation ($id: Int!, $name: String!, $mode: String!) {
    editUserGroup(id: $id, name: $name, mode: $mode)
  }
`;

export const DELETE_USER_GROUP = gql`
  mutation ($id: Int!) {
    deleteUserGroup(id: $id)
  }
`;

export const ADD_TO_USER_GROUP = gql`
  mutation ($userId: String!, $userGroupId: Int!) {
    addToUserGroup(userId: $userId, userGroupId: $userGroupId)
  }
`;

export const REMOVE_FROM_USER_GROUP = gql`
  mutation ($userId: Int!, $userGroupId: Int!) {
    removeFromUserGroup(userId: $userId, userGroupId: $userGroupId)
  }
`;

export const CREATE_TICKET = gql`
  mutation ($title: String!, $body: String!) {
    createTicket(title: $title, body: $body)
  }
`;
