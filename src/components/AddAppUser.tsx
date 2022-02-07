import { useMutation } from "@apollo/client";
import { Button, Checkbox, Col, Form, message, Modal, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import SearchAPSUser from "./common/SearchAPS";
import { ADD_APP_USER } from "../api/mutations";
import { errorMessage } from "../helpers/gql";

const AddAppUser = () => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addAppUser, { loading: loadingAddAppUser }] = useMutation(
    ADD_APP_USER,
    {
      onCompleted: () => {
        message.success("Successfully added app user.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while adding app user.");
      },
      refetchQueries: ["appUsers"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { employee, admin, agent } = values;
    let roles = [];
    if (!employee) {
      message.error("Please select an employee.");
      return;
    }
    if (admin === true) roles.push("Admin");
    if (agent === true) roles.push("Agent");

    if (roles.length === 0) {
      message.error("Please select at least one role.");
      return;
    }

    addAppUser({
      variables: {
        userId: employee.userId,
        roles,
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
      >
        Add User
      </Button>
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
        >
          <Form.Item label="Employee" name="employee">
            <SearchAPSUser />
          </Form.Item>
          <Row gutter={16}>
            <Col>
              <Form.Item
                label="Roles"
                name="admin"
                required={false}
                valuePropName="checked"
              >
                <Checkbox>Admin</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label=" "
                name="agent"
                required={false}
                valuePropName="checked"
              >
                <Checkbox>Agent</Checkbox>
              </Form.Item>
            </Col>
          </Row>

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
                  loading={loadingAddAppUser}
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

export default AddAppUser;
