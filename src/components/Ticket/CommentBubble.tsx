import { Tooltip } from "antd";
import { stringToColor } from "../../helpers/style";
import CommentGroup from "../../models/CommentGroup";
import moment from "moment";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import ParsedAttachment from "./ParsedAttachment";
import ParsedRating from "./ParsedRating";
import UserAvatar from "../common/UserAvatar";
import { DATETIME_FORMATS } from "../../helpers/constants";

const CommentBubble = ({ group }: { group: CommentGroup }) => {
  const { user } = useContext(UserContext);
  const isSelf = user?.id === group.user.id;
  const renderAvatar = () => (
    <Tooltip
      title={
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {group.user.fullName} ({group.user.rcno})
          </div>
        </>
      }
      placement="left"
    >
      <div
        style={{
          marginBottom: 12,
        }}
      >
        <UserAvatar user={group.user} />
      </div>
    </Tooltip>
  );

  // Determine bubble color based on comment mode or whether it is current user
  let bubbleColor = (mode: string): string => {
    let color = "white";
    if (mode === "Private") color = "#e5e5e5";
    else if (mode === "Public") {
      if (isSelf) color = "#e6fef5";
      else color = "#e6f9ff";
    }
    return color;
  };

  // Modify what comment shows based on content
  const parseComment = (comment: string) => {
    const ratingRegEx = /(rating:[0-9]+)+/g;
    const ratingMatches = Array.from(comment.matchAll(ratingRegEx));
    // If comment contains rating: followed by a number, show the rating stars
    if (ratingMatches && ratingMatches.length > 0) {
      return (
        <ParsedRating
          comment={comment}
          match={ratingMatches[0][0]}
          isSelf={isSelf}
        />
      );
    }
    const attachmentRegEx = /(attachment:[0-9]+)+/g;
    const attachmentMatches = Array.from(comment.matchAll(attachmentRegEx));
    // If comment contains attachment: followed by a number, show the attachment
    if (attachmentMatches && attachmentMatches.length > 0) {
      return (
        <ParsedAttachment
          comment={comment}
          match={attachmentMatches[0][0]}
          isSelf={isSelf}
        />
      );
    }
    return <div>{comment}</div>;
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: 5,
        alignItems: "flex-end",
        justifyContent: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <div style={{ width: 32, flexShrink: 0 }}>
        {!isSelf && renderAvatar()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isSelf ? "flex-end" : "flex-start",
        }}
      >
        {group.comments.map((comment, index) => (
          <div
            style={{
              backgroundColor: bubbleColor(comment.mode),
              borderRadius: 20,
              padding: 10,
              margin: "5px 10px 0 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: isSelf ? "flex-end" : "flex-start",
              border:
                comment.mode === "Body"
                  ? "1px solid rgb(150, 150, 150)"
                  : "none",
              fontSize: comment.mode === "Body" ? "110%" : "100%",
              whiteSpace: "pre-wrap",
            }}
            key={comment.id}
          >
            {((!isSelf && index === 0) || comment.mode === "Body") && (
              <div
                style={{
                  color: stringToColor(group.user.fullName),
                  fontWeight: 700,
                }}
              >
                {group.user.fullName}
              </div>
            )}
            {parseComment(comment.body)}
            <div
              style={{ fontSize: "90%", opacity: 0.5 }}
              title={moment(comment.createdAt).format(DATETIME_FORMATS.FULL)}
            >
              {moment(comment.createdAt).format(DATETIME_FORMATS.SHORT)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: 32, flexShrink: 0 }}>{isSelf && renderAvatar()}</div>
    </div>
  );
};

export default CommentBubble;
