import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./fragments";

export const COMMENT_CREATED = gql`
  ${USER_FRAGMENT}
  subscription commentCreated($ticketId: Int!) {
    commentCreated(ticketId: $ticketId) {
      id
      body
      mode
      createdAt
      user {
        ...UserFields
      }
    }
  }
`;

export const NOTIFICATION_CREATED = gql`
  subscription notificationCreated {
    notificationCreated {
      id
      body
      createdAt
      readAt
      link
    }
  }
`;