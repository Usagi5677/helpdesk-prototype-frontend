import { Avatar, Tooltip } from "antd";
import { stringToColor } from "../../helpers/style";
import CommentGroup from "../../models/CommentGroup";
import moment from "moment";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import ParsedAttachment from "./ParsedAttachment";

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
      <Avatar
        style={{
          backgroundColor: stringToColor(group.user.fullName),
        }}
      >
        {group.user.fullName
          .match(/^\w|\b\w(?=\S+$)/g)
          ?.join()
          .replace(",", "")
          .toUpperCase()}
      </Avatar>
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
    let parsed = <div>{comment}</div>;
    const docRegEx = /(attachment:[0-9])+/g;
    const matches = Array.from(comment.matchAll(docRegEx));
    // If comment contains attachment: followed by a number, show the attachment
    if (matches && matches.length > 0) {
      parsed = (
        <ParsedAttachment
          comment={comment}
          match={matches[0][0]}
          isSelf={isSelf}
        />
      );
    }
    return parsed;
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
            <div style={{ fontSize: "90%", opacity: 0.5 }}>
              {moment(comment.createdAt).format("DD MMMM YYYY HH:mm:ss")}
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: 32, flexShrink: 0 }}>{isSelf && renderAvatar()}</div>
    </div>
  );
};

export default CommentBubble;
