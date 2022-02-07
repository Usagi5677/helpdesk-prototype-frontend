import classes from "./UserList.module.css";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import User from "../../models/User";
import { Tag } from "antd";
import "antd/lib/tag/style/css";

const UserList = ({ user }: { user: User }) => {
  return (
    <div className={classes["user-list-wrapper"]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          lineHeight: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <DefaultAvatar
            fullname={user.fullName}
            userAvatarWidth={"36px"}
            userAvatarHeight={"36px"}
            showAgentList={false}
          />
          <div style={{ marginLeft: ".5rem" }}>
            {user.fullName} ({user.rcno})
          </div>
        </div>
        <div>
          {user.roles.map((role) => (
            <Tag
              color={
                role === "Admin"
                  ? "magenta"
                  : role === "Agent"
                  ? "green"
                  : "grey"
              }
              key={role}
            >
              {role}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
