import classes from "./UserList.module.css";
import DefaultAvatar from "../UI/DefaultAvatar/DefaultAvatar";
import User from "../../models/User";
import { message, Popconfirm, Tag } from "antd";
import { useMutation } from "@apollo/client";
import { REMOVE_USER_ROLE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

const UserList = ({ user }: { user: User }) => {
  const { user: self } = useContext(UserContext);
  const [removingRole, setRemovingRole] = useState("");
  const [removeUserRole, { loading: removingUserRole }] = useMutation(
    REMOVE_USER_ROLE,
    {
      onCompleted: () => {
        message.success("Successfully removed user role.");
        setRemovingRole("");
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing app user.");
      },
      refetchQueries: ["appUsers"],
    }
  );
  const remove = (role: string) => {
    removeUserRole({
      variables: {
        userId: user.id,
        role,
      },
    });
  };
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
            <Popconfirm
              disabled={
                (removingUserRole && role === removingRole) ||
                (self?.id === user.id && role === "Admin")
              }
              key={role}
              title={`Do you want to remove ${role} role from ${user.fullName}?`}
              onConfirm={() => remove(role)}
              okText="Confirm"
              cancelText="No"
              placement="topRight"
            >
              <Tag
                color={
                  role === "Admin"
                    ? "magenta"
                    : role === "Agent"
                    ? "green"
                    : "grey"
                }
                key={role}
                style={{
                  cursor:
                    self?.id === user.id && role === "Admin"
                      ? "auto"
                      : "pointer",
                }}
              >
                {role}
              </Tag>
            </Popconfirm>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
