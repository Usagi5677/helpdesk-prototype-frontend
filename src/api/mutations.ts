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

export const ADD_TICKET_CATEGORY = gql`
  mutation ($ticketId: Int!, $categoryId: Int!) {
    addTicketCategory(ticketId: $ticketId, categoryId: $categoryId)
  }
`;

export const REMOVE_TICKET_CATEGORY = gql`
  mutation ($ticketId: Int!, $categoryId: Int!) {
    removeTicketCategory(ticketId: $ticketId, categoryId: $categoryId)
  }
`;

export const SET_TICKET_PRIORITY = gql`
  mutation ($ticketId: Int!, $priority: Priority!) {
    setTicketPriority(ticketId: $ticketId, priority: $priority)
  }
`;

export const ASSIGN_AGENTS = gql`
  mutation ($ticketId: Int!, $agentIds: [Int!]!) {
    assignAgents(ticketId: $ticketId, agentIds: $agentIds)
  }
`;

export const UNASSIGN_AGENT = gql`
  mutation ($ticketId: Int!, $agentId: Int!) {
    unassignAgent(ticketId: $ticketId, agentId: $agentId)
  }
`;

export const SET_OWNER = gql`
  mutation ($agentId: Int!, $ticketId: Int!) {
    setOwner(agentId: $agentId, ticketId: $ticketId)
  }
`;

export const ADD_FOLLOWER = gql`
  mutation ($newFollowerUserId: String!, $ticketId: Int!) {
    addFollower(newFollowerUserId: $newFollowerUserId, ticketId: $ticketId)
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation ($deletingFollowerId: Int!, $ticketId: Int!) {
    removeFollower(deletingFollowerId: $deletingFollowerId, ticketId: $ticketId)
  }
`;

export const ADD_CHECKLIST_ITEM = gql`
  mutation ($description: String!, $ticketId: Int!) {
    addChecklistItem(description: $description, ticketId: $ticketId)
  }
`;

export const DELETE_CHECKLIST_ITEM = gql`
  mutation ($id: Int!) {
    deleteChecklistItem(id: $id)
  }
`;

export const TOGGLE_CHECKLIST_ITEM = gql`
  mutation ($id: Int!, $complete: Boolean!) {
    toggleChecklistItem(id: $id, complete: $complete)
  }
`;

export const SET_TICKET_STATUS = gql`
  mutation ($ticketId: Int!, $status: Status!) {
    setTicketStatus(ticketId: $ticketId, status: $status)
  }
`;

export const ADD_COMMENT = gql`
  mutation ($ticketId: Int!, $body: String!, $isPublic: Boolean) {
    addComment(ticketId: $ticketId, body: $body, isPublic: $isPublic)
  }
`;
export const CREATE_KNOWLEDGEBASE = gql`
  mutation ($title: String!, $body: String!, $mode: String!) {
    createKnowledgebase(title: $title, body: $body, mode: $mode)
  }
`;

export const DELETE_KNOWLEDGEBASE = gql`
  mutation ($knowledgebaseId: Int!) {
    removeKnowledgebase(knowledgebaseId: $knowledgebaseId)
  }
`;
