import { useMutation } from "@apollo/client";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ADD_TO_USER_GROUP, REMOVE_FROM_USER_GROUP } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaListUl, FaMinus } from "react-icons/fa";
import UserGroup from "../../models/UserGroup";
import SearchAPSUser from "../common/SearchAPS";
import User from "../../models/User";
import UserContext from "../../contexts/UserContext";

const ViewUserGroupUsers = ({ userGroup }: { userGroup: UserGroup }) => {
  const { user: self } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addToUserGroup, { loading: adding }] = useMutation(ADD_TO_USER_GROUP, {
    onCompleted: () => {
      message.success("Successfully added user to user group.");
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while adding user to user group.");
    },
    refetchQueries: ["userGroups"],
  });

  const [removeFromUserGroup, { loading: removing }] = useMutation(
    REMOVE_FROM_USER_GROUP,
    {
      onCompleted: () => {
        message.success("Successfully removed user from user group.");
      },
      onError: (error) => {
        errorMessage(
          error,
          "Unexpected error while removing user from user group."
        );
      },
      refetchQueries: ["userGroups"],
    }
  );

  const handleCancel = () => {
    setVisible(false);
  };

  const addUser = (user: User) => {
    addToUserGroup({
      variables: { userId: user.userId, userGroupId: userGroup.id },
    });
  };

  const removeUser = (user: User) => {
    removeFromUserGroup({
      variables: { userId: user.id, userGroupId: userGroup.id },
    });
  };

  return (
    <>
      <Button
        htmlType="button"
        size="middle"
        onClick={() => setVisible(true)}
        icon={<FaListUl style={{ fontSize: 20 }} />}
        shape="round"
        style={{ color: "var(--primary)", border: "none" }}
      />
      <Modal visible={visible} closable={false} footer={null}>
        <Typography.Title level={4}>
          User Group: {userGroup.name}
        </Typography.Title>
        {self?.isAdmin && (
          // When a user is selected from the SearchAPSUser component, the
          // addUser function is run and the SearchAPSUser searchbar is cleared
          <SearchAPSUser
            allowClear={true}
            placeholder="Select employee to add"
            onChange={(user: User, clear: () => void) => {
              addUser(user);
              clear();
            }}
          />
        )}
        <Form form={form} layout="vertical" name="basic" id="myForm">
          {(adding || removing) && (
            <div>
              <Spin
                style={{ width: "100%", margin: "0 auto", marginTop: "1rem" }}
              />
            </div>
          )}
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: "10px 20px 10px 20px",
            }}
          >
            {userGroup.users?.length === 0 ? (
              <div style={{ opacity: 0.5 }}>No users in this user group.</div>
            ) : (
              <>
                {userGroup.users?.map((user) => (
                  <div key={user.id}>
                    {self?.isAdmin && (
                      <Popconfirm
                        disabled={removing || adding}
                        title={`Are you sure to remove ${user.fullName} from this group?`}
                        onConfirm={() => removeUser(user)}
                        okText="Confirm"
                        cancelText="No"
                        placement="topRight"
                      >
                        <Button
                          htmlType="button"
                          size="middle"
                          icon={<FaMinus style={{ fontSize: 15 }} />}
                          shape="circle"
                          type="link"
                          style={{
                            color: "var(--error)",
                            border: "none",
                          }}
                        />
                      </Popconfirm>
                    )}
                    {user.fullName} ({user.rcno})
                  </div>
                ))}
              </>
            )}
          </div>
          <Row justify="end" gutter={16}>
            <Col>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="ghost"
                  onClick={handleCancel}
                  style={{ color: "var(--primary)", borderRadius: 20 }}
                >
                  Close
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ViewUserGroupUsers;
