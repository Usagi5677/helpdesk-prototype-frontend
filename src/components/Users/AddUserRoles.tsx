import { useMutation } from "@apollo/client";
import { Button, Checkbox, Col, Form, message, Modal, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import SearchAPSUser from "../common/SearchAPS";
import { ADD_APP_USER } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Site from "../../models/Site";

const AddUserRoles = ({ site }: { site?: Site }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addUserRoles, { loading: loadingAddUserRoles }] = useMutation(
    ADD_APP_USER,
    {
      onCompleted: () => {
        message.success("Successfully added user roles.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while adding user roles.");
      },
      refetchQueries: ["appUsers"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { employee, admin, agent, user } = values;
    let roles = [];
    if (!employee) {
      message.error("Please select an employee.");
      return;
    }
    if (admin === true) roles.push("Admin");
    if (agent === true) roles.push("Agent");
    if (user === true) roles.push("User");

    if (roles.length === 0) {
      message.error("Please select at least one role.");
      return;
    }

    addUserRoles({
      variables: {
        userId: employee.userId,
        roles,
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
      >
        Add User Roles
      </Button>
      <Modal
        visible={visible}
        closable={false}
        footer={null}
        title={`Add user roles to ${site?.code}`}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
        >
          <Form.Item label="Employee" name="employee">
            {/* As SearchAPSUser component is inside a form, the onChange event 
            handler does not need to be specifically passed. The selected 
            employee will automatically be added to the form value */}
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
            {site?.mode === "Private" && (
              <Col>
                <Form.Item
                  label=" "
                  name="user"
                  required={false}
                  valuePropName="checked"
                >
                  <Checkbox>User</Checkbox>
                </Form.Item>
              </Col>
            )}
          </Row>
          {site?.mode === "Private" && (
            <div style={{ opacity: 0.5, marginBottom: "1rem", marginTop: -5 }}>
              <div>
                As this is a private site, employees will need the User role to
                create tickets in this site.
              </div>
            </div>
          )}
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
                  loading={loadingAddUserRoles}
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

export default AddUserRoles;
