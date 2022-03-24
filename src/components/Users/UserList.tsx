import classes from "./UserList.module.css";
import User from "../../models/User";
import { Button, message, Popconfirm, Tag } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_USER_ROLE, REMOVE_USER_ROLE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import UserAvatar from "../common/UserAvatar";
import { PlusOutlined } from "@ant-design/icons";

const UserList = ({ user, siteId }: { user: User; siteId?: number }) => {
  const { user: self } = useContext(UserContext);
  const [removingRole, setRemovingRole] = useState("");
  const [addingRole, setAddingRole] = useState("");

  let allRoles = ["Admin", "Agent"];
  const site = self?.siteAccess.admin.find((site) => site.id === siteId);
  if (site && site.mode === "Private") {
    allRoles.push("User");
  }

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
        siteId,
      },
    });
  };

  const [addUserRole, { loading: addingLoading }] = useMutation(ADD_USER_ROLE, {
    onCompleted: () => {
      message.success("Successfully added user role.");
      setAddingRole("");
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while adding user role.");
    },
    refetchQueries: ["appUsers"],
  });

  const remainingRoles = allRoles.filter(
    (r) => !user.roles?.map((r) => r.role).includes(r)
  );

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
          <UserAvatar user={user} />
          <div style={{ marginLeft: ".5rem" }}>
            {user.fullName} ({user.rcno})
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {remainingRoles?.map((role) => (
            <Button
              key={role}
              type="ghost"
              size="small"
              style={{
                borderRadius: 20,
                marginRight: "1rem",
                fontSize: "80%",
              }}
              loading={addingLoading && addingRole === role}
              onClick={() => {
                setAddingRole(role);
                addUserRole({
                  variables: {
                    userId: user.id,
                    role,
                    siteId,
                  },
                });
              }}
              icon={<PlusOutlined />}
            >
              {role}
            </Button>
          ))}
          {user.roles?.map((role) => (
            <Popconfirm
              disabled={
                (removingUserRole && role.role === removingRole) ||
                (self?.id === user.id && role.role === "Admin")
              }
              key={role.role}
              title={`Do you want to remove ${role.role} role from ${user.fullName}?`}
              onConfirm={() => remove(role.role)}
              okText="Confirm"
              cancelText="No"
              placement="topRight"
            >
              <Tag
                color={
                  role.role === "Admin"
                    ? "magenta"
                    : role.role === "Agent"
                    ? "green"
                    : role.role === "User"
                    ? "cyan"
                    : "grey"
                }
                key={role.role}
                style={{
                  cursor:
                    self?.id === user.id && role.role === "Admin"
                      ? "auto"
                      : "pointer",
                }}
              >
                {role.role}
              </Tag>
            </Popconfirm>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
