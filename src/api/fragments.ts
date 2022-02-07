import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    rcno
    fullName
    roles
  }
`;

export const APS_USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    userId
    fullName
    rcno
  }
`;
