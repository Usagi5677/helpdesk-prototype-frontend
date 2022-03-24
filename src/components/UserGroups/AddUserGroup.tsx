import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ADD_USER_GROUP } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Site from "../../models/Site";

const AddUserGroup = ({ site }: { site?: Site }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addUserGroup, { loading: loadingAddUserGroup }] = useMutation(
    ADD_USER_GROUP,
    {
      onCompleted: () => {
        message.success("Successfully added user group.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while adding user group.");
      },
      refetchQueries: ["userGroups"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { name, mode } = values;
    if (!name) {
      message.error("Please enter a user group name.");
      return;
    }
    addUserGroup({
      variables: {
        name,
        mode,
        siteId: site?.id,
      },
    });
  };

  return (
    <>
      <Button
        htmlType="button"
        size="middle"
        onClick={() => setVisible(true)}
        style={{ width: "100%", color: "var(--primary)", borderRadius: 20 }}
        loading={loadingAddUserGroup}
      >
        Add User Group
      </Button>
      <Modal
        visible={visible}
        closable={false}
        footer={null}
        title={`Add user group to ${site?.code}`}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{ mode: "Public" }}
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
                  loading={loadingAddUserGroup}
                  style={{ borderRadius: 20 }}
                >
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserGroup;
