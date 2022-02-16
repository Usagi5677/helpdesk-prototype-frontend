import { useLazyQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect } from "react";
import { GET_COMMENTS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import Comment from "../../models/Comment";
import { COMMENT_CREATED } from "../../api/subscriptions";

const Comments = ({ ticket }: { ticket: Ticket }) => {
  const [getComments, { data, loading, subscribeToMore }] = useLazyQuery(
    GET_COMMENTS,
    {
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
    }
  );
  useEffect(() => {
    if (ticket) {
      getComments({ variables: { ticketId: ticket.id } });
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
    }
  }, [ticket]);

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
          height: 380,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <div>
          {data?.comments.map((comment: Comment) => (
            <div key={comment.id}>{comment.body}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
