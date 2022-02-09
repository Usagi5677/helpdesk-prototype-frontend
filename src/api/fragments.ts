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

export const TICKET_FRAGMENT = gql`
  ${USER_FRAGMENT}
  fragment TicketFields on Ticket {
    id
    createdAt
    createdBy {
      ...UserFields
      email
    }
    status
    title
    body
    priority
    categories {
      id
      name
    }
  }
`;
