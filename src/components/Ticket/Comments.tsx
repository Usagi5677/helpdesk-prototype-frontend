import { useLazyQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { GET_COMMENTS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import Comment from "../../models/Comment";
import { COMMENT_CREATED } from "../../api/subscriptions";
import CommentBubble from "./CommentBubble";
import CommentGroup from "../../models/CommentGroup";

const groupComments = (data: any) => {
  let grouped: CommentGroup[] = [];
  let lastGroup: any = { user: null, comments: [] };
  data?.comments.forEach((comment: Comment, index: number) => {
    const commentWithoutUser = { ...comment, user: undefined };
    if (lastGroup.user === null) {
      lastGroup.user = comment.user;
    } else if (comment.user.id !== lastGroup.user?.id) {
      grouped.push(lastGroup);
      lastGroup = { user: null, comments: [] };
      lastGroup.user = comment.user;
    }
    lastGroup.comments.push(commentWithoutUser);
    if (index + 1 === data?.comments.length) {
      grouped.push(lastGroup);
    }
  });
  return grouped;
};

const Comments = ({ ticket }: { ticket: Ticket }) => {
  const [subscribed, setSubscribed] = useState(false);

  const [getComments, { data, loading, subscribeToMore }] = useLazyQuery(
    GET_COMMENTS,
    {
      onCompleted: () => {
        subscribe();
      },
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
      fetchPolicy: "cache-and-network",
    }
  );
  useEffect(() => {
    if (ticket) {
      getComments({ variables: { ticketId: ticket.id } });
    }
  }, [ticket]);

  const subscribe = () => {
    // Ensure subscription is done once and not every render
    if (subscribed) return;
    subscribeToMore({
      document: COMMENT_CREATED,
      variables: { ticketId: ticket?.id },
      updateQuery: (prev, { subscriptionData }) => {
        const updated = [
          ...prev.comments,
          subscriptionData.data.commentCreated,
        ];
        return { comments: updated };
      },
    });
    setSubscribed(true);
  };

  const groupedComments = groupComments(data);

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Spin />
        </div>
      )}
      <div
        style={{
          overflowY: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          paddingBottom: 10,
        }}
      >
        <div>
          {groupedComments?.map((group: CommentGroup) => (
            <CommentBubble group={group} key={group.comments[0].id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
