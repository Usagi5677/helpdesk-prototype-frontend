import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { EDIT_USER_GROUP } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaEdit } from "react-icons/fa";
import UserGroup from "../../models/UserGroup";

const EditUserGroup = ({ userGroup }: { userGroup: UserGroup }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [editUserGroup, { loading: loadingEditUserGroup }] = useMutation(
    EDIT_USER_GROUP,
    {
      onCompleted: () => {
        message.success("Successfully updated user group.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while updating user group.");
      },
      refetchQueries: ["userGroups"],
    }
  );

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { name, mode } = values;
    if (!name) {
      message.error("Please enter a user group name.");
      return;
    }
    if (mode !== "Public" && mode !== "Private") {
      message.error("Invalid mode.");
      return;
    }
    editUserGroup({
      variables: {
        id: userGroup.id,
        name,
        mode,
      },
    });
  };

  return (
    <>
      <Button
        htmlType="button"
        size="middle"
        onClick={() => setVisible(true)}
        icon={<FaEdit style={{ fontSize: 20, marginRight: -3 }} />}
        shape="round"
        style={{ color: "var(--primary)", border: "none", marginLeft: "1rem" }}
        loading={loadingEditUserGroup}
      />
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{ name: userGroup.name, mode: userGroup.mode }}
        >
          <Form.Item
            label="Name"
            name="name"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter a user group name.",
              },
            ]}
          >
            <Input placeholder="User Group name" />
          </Form.Item>
          <Form.Item label="Mode" name="mode">
            <Radio.Group buttonStyle="solid" optionType="button">
              <Radio.Button value="Public">Public</Radio.Button>
              <Radio.Button value="Private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div style={{ opacity: 0.5, marginBottom: "1rem", marginTop: -5 }}>
            <div>Public user groups are visible to all sites.</div>
            <div>
              Private user groups are only visible to the site it belongs to.
            </div>
          </div>
          <Row justify="end" gutter={16}>
            <Col>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="ghost"
                  onClick={handleCancel}
                  style={{ color: "var(--primary)", borderRadius: 20 }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingEditUserGroup}
                  style={{ borderRadius: 20 }}
                >
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditUserGroup;
