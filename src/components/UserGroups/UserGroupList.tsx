import classes from "../Users/UserList.module.css";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import { Button, message, Popconfirm } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_USER_GROUP } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaLock, FaTrash } from "react-icons/fa";
import EditUserGroup from "./EditUserGroup";
import UserGroup from "../../models/UserGroup";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import ViewUserGroupUsers from "./ViewUserGroupUsers";

const UserGroupList = ({ userGroup }: { userGroup: UserGroup }) => {
  const { user } = useContext(UserContext);
  const [removeUserGroup, { loading: deleting }] = useMutation(
    DELETE_USER_GROUP,
    {
      onCompleted: () => {
        message.success("Successfully removed user group.");
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing user group.");
      },
      refetchQueries: ["userGroups"],
    }
  );
  const remove = () => {
    removeUserGroup({
      variables: {
        id: userGroup.id,
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
            fullname={userGroup.name}
            userAvatarWidth={"36px"}
            userAvatarHeight={"36px"}
            showAgentList={false}
          />
          <div style={{ marginLeft: ".5rem" }}>{userGroup.name}</div>
          {userGroup.mode === "Private" && (
            <FaLock style={{ marginLeft: ".5rem" }} />
          )}
        </div>
        {user?.isAdmin && (
          <div>
            <ViewUserGroupUsers userGroup={userGroup} />
            <EditUserGroup userGroup={userGroup} />
            <Popconfirm
              disabled={deleting}
              title={`Are you sure to remove this user group?`}
              onConfirm={() => remove()}
              okText="Confirm"
              cancelText="No"
              placement="topRight"
            >
              <Button
                htmlType="button"
                size="middle"
                icon={<FaTrash style={{ fontSize: 20 }} />}
                shape="round"
                style={{
                  color: "var(--error)",
                  marginLeft: "1rem",
                  border: "none",
                }}
                loading={deleting}
              />
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGroupList;
