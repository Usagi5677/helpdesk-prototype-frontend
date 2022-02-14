import { gql } from "@apollo/client";

export const PAGE_INFO = gql`
  fragment PageInfoField on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    count
  }
`;

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

export const CATEGORIES_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;

export const TICKET_FRAGMENT = gql`
  ${USER_FRAGMENT}
  ${CATEGORIES_FRAGMENT}
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
      ...CategoryFields
    }
    agents {
      ...UserFields
    }
    ownerId
    checklistItems {
      id
      description
      completedAt
    }
  }
`;
