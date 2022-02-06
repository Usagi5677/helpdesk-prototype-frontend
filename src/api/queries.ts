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
