import { Avatar, Tooltip } from "antd";
import { stringToColor } from "../../helpers/style";
import CommentGroup from "../../models/CommentGroup";
import moment from "moment";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

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
              backgroundColor:
                comment.mode === "Private"
                  ? "#e5e5e5"
                  : isSelf
                  ? "#e6fef5"
                  : "#e6f9ff",
              borderRadius: 20,
              padding: 10,
              margin: "5px 10px 0 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: isSelf ? "flex-end" : "flex-start",
            }}
            key={comment.id}
          >
            {!isSelf && index === 0 && (
              <div
                style={{
                  color: stringToColor(group.user.fullName),
                  fontWeight: 700,
                }}
              >
                {group.user.fullName}
              </div>
            )}
            <div>{comment.body}</div>
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
