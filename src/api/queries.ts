import { gql } from "@apollo/client";
import {
  APS_USER_FRAGMENT,
  CATEGORIES_FRAGMENT,
  TICKET_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

export const ME_QUERY = gql`
  query {
    me {
      id
      rcno
      fullName
      email
      userId
      roles {
        site {
          id
          code
          name
        }
        role
      }
      sites {
        id
        code
        name
        mode
      }
      isSuperAdmin
    }
  }
`;

export const APP_USERS_QUERY = gql`
  ${USER_FRAGMENT}
  query appUsers($siteId: Int!) {
    appUsers(siteId: $siteId) {
      ...UserFields
      roles {
        role
      }
    }
  }
`;

export const SEARCH_APS_QUERY = gql`
  ${APS_USER_FRAGMENT}
  query search($query: String!) {
    searchAPSUsers(query: $query) {
      ...UserFieldsAPS
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
    $siteId: Int!
  ) {
    categories(
      after: $after
      before: $before
      first: $first
      last: $last
      name: $name
      siteId: $siteId
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

export const CATEGORIES_WITH_ACCESS = gql`
  ${CATEGORIES_FRAGMENT}
  query categoriesWithAccess {
    categoriesWithAccess {
      ...CategoryFields
      site {
        id
        code
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
    $siteId: Int!
  ) {
    userGroups(
      after: $after
      before: $before
      first: $first
      last: $last
      name: $name
      siteId: $siteId
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
    $siteId: Int
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
      siteId: $siteId
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

export const ALL_TICKETS = gql`
  ${TICKET_FRAGMENT}
  query allTickets(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
    $status: Status
    $categoryIds: [Int!]
    $createdByUserId: String
    $priority: Priority
    $from: Date
    $to: Date
    $siteId: Int
  ) {
    tickets(
      after: $after
      before: $before
      first: $first
      last: $last
      search: $search
      categoryIds: $categoryIds
      createdByUserId: $createdByUserId
      priority: $priority
      status: $status
      from: $from
      to: $to
      siteId: $siteId
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

export const ASSIGNED_TICKETS = gql`
  ${TICKET_FRAGMENT}
  query assignedTickets(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
    $status: Status
    $categoryIds: [Int!]
    $createdByUserId: String
    $priority: Priority
    $from: Date
    $to: Date
    $siteId: Int
  ) {
    assignedTickets(
      after: $after
      before: $before
      first: $first
      last: $last
      search: $search
      categoryIds: $categoryIds
      createdByUserId: $createdByUserId
      priority: $priority
      status: $status
      from: $from
      to: $to
      siteId: $siteId
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

export const FOLLOWING_TICKETS = gql`
  ${TICKET_FRAGMENT}
  query followingTickets(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
    $status: Status
    $categoryIds: [Int!]
    $createdByUserId: String
    $priority: Priority
    $from: Date
    $to: Date
    $siteId: Int
  ) {
    followingTickets(
      after: $after
      before: $before
      first: $first
      last: $last
      search: $search
      categoryIds: $categoryIds
      createdByUserId: $createdByUserId
      priority: $priority
      status: $status
      from: $from
      to: $to
      siteId: $siteId
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
  query searchUsersAndGroups(
    $query: String!
    $siteId: Int!
    $onlyAgents: Boolean!
  ) {
    searchUsersAndGroups(
      query: $query
      siteId: $siteId
      onlyAgents: $onlyAgents
    ) {
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
      mode
    }
  }
`;

export const GET_ALL_KNOWLEDGEBASE = gql`
  query getAllKnowledgebase(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
    $siteId: Int
  ) {
    getAllKnowledgebase(
      after: $after
      before: $before
      first: $first
      last: $last
      search: $search
      siteId: $siteId
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
          createdAt
          createdBy {
            id
            rcno
            fullName
          }
          title
          body
          mode
          site {
            id
            code
          }
        }
      }
    }
  }
`;

export const SINGLEKNOWLEDGEBASE = gql`
  query singleKnowledgebase($knowledgebaseId: Int!) {
    singleKnowledgebase(knowledgebaseId: $knowledgebaseId) {
      id
      title
      body
      mode
      createdBy {
        id
        rcno
        fullName
        email
      }
      site {
        id
        code
      }
    }
  }
`;

export const ATTACHMENT = gql`
  query ticketAttachment($id: Int!) {
    ticketAttachment(id: $id) {
      id
      createdAt
      mimeType
      originalName
      description
      mode
    }
  }
`;

export const STATUS_COUNT = gql`
  query ticketStatusCount($siteId: Int) {
    ticketStatusCount(siteId: $siteId) {
      status
      count
    }
  }
`;

export const STATUS_COUNT_HISTORY = gql`
  query ticketStatusCountHistory(
    $statuses: [Status!]
    $from: Date!
    $to: Date!
    $siteId: Int
  ) {
    ticketStatusCountHistory(
      statuses: $statuses
      from: $from
      to: $to
      siteId: $siteId
    ) {
      date
      statusCounts {
        status
        count
      }
    }
  }
`;

export const NOTIFICATIONS = gql`
  query notifications {
    notifications {
      body
      createdAt
      id
      readAt
      link
      userId
    }
  }
`;

export const AGENT_QUEUE = gql`
  ${USER_FRAGMENT}
  query agentQueue($siteId: Int) {
    agentQueue(siteId: $siteId) {
      agent {
        ...UserFields
      }
      tickets {
        id
        title
        status
        site {
          id
          code
        }
      }
    }
  }
`;

export const SITES = gql`
  query sites {
    sites {
      id
      name
      code
      mode
      isEnabled
    }
  }
`;
