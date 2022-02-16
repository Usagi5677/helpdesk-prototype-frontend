import { gql } from "@apollo/client";
import {
  APS_USER_FRAGMENT,
  CATEGORIES_FRAGMENT,
  TICKET_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

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
  ${CATEGORIES_FRAGMENT}
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
          ...CategoryFields
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

export const MY_TICKETS = gql`
  ${TICKET_FRAGMENT}
  query myTickets(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
    $status: Status
    $categoryIds: [Int!]
    $priority: Priority
    $from: Date
    $to: Date
  ) {
    myTickets(
      after: $after
      before: $before
      first: $first
      last: $last
      search: $search
      categoryIds: $categoryIds
      priority: $priority
      status: $status
      from: $from
      to: $to
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
          ...TicketFields
        }
      }
    }
  }
`;

export const HAS_TICKET_ACCESS = gql`
  query hasTicketAccess($ticketId: Int!) {
    hasTicketAccess(ticketId: $ticketId)
  }
`;

export const TICKET = gql`
  ${TICKET_FRAGMENT}
  query ticket($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      ...TicketFields
      followers {
        id
        rcno
        fullName
      }
    }
  }
`;

export const SEARCH_USERS_AND_USERGROUPS = gql`
  ${USER_FRAGMENT}
  query searchUsersAndGroups($query: String!, $onlyAgents: Boolean!) {
    searchUsersAndGroups(query: $query, onlyAgents: $onlyAgents) {
      type
      name
      user {
        ...UserFields
      }
      userGroup {
        id
        name
        users {
          ...UserFields
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  ${USER_FRAGMENT}
  query ticketComments($ticketId: Int!) {
    comments(ticketId: $ticketId) {
      id
      createdAt
      user {
        ...UserFields
      }
      body
    }
  }
`;
