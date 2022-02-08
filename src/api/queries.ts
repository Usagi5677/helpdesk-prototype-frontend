import { gql } from "@apollo/client";
import { APS_USER_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const APP_USERS_QUERY = gql`
  ${USER_FRAGMENT}
  query appUsers {
    appUsers {
      ...UserFields
    }
  }
`;

export const SEARCH_APS_QUERY = gql`
  ${APS_USER_FRAGMENT}
  query search($query: String!) {
    searchAPSUsers(query: $query) {
      ...UserFields
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query categories(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $name: String
  ) {
    categories(
      after: $after
      before: $before
      first: $first
      last: $last
      name: $name
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        count
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const USER_GROUPS_QUERY = gql`
  query userGroups(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $name: String
  ) {
    userGroups(
      after: $after
      before: $before
      first: $first
      last: $last
      name: $name
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        count
      }
      edges {
        node {
          id
          name
          mode
          users {
            id
            rcno
            fullName
            userId
          }
        }
      }
    }
  }
`;
