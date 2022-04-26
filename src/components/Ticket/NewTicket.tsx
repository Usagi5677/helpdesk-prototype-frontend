import { useMutation } from "@apollo/client";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { CREATE_TICKET } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import SiteWithIcon from "../common/SiteWithIcon";

const NewTicket = ({ type }: { type?: "Text" | "Icon" | "Dashboard" }) => {
  if (!type) type = "Text";

  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [done, setDone] = useState(false);

  const [createTicket, { loading }] = useMutation(CREATE_TICKET, {
    onCompleted: (data) => {
      message.success("Successfully created ticket.");
      setDone(true);
      window.location.href = `/ticket/${data.createTicket}`;
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while creating ticket.");
    },
    refetchQueries: ["myTickets"],
  });

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { title, body, siteId } = values;
    createTicket({
      variables: {
        title,
        body,
        siteId,
      },
    });
  };

  return (
    <>
      {type === "Icon" ? (
        <Tooltip title="New Ticket">
          <Button
            icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
            shape="circle"
            type="link"
            style={{ color: "white" }}
            onClick={() => setVisible(true)}
          />
        </Tooltip>
      ) : type === "Dashboard" ? (
        <Button
          htmlType="button"
          size="large"
          onClick={() => setVisible(true)}
          style={{ color: "var(--primary)", borderRadius: 20 }}
          loading={loading}
        >
          Create New Ticket
        </Button>
      ) : (
        <Button
          htmlType="button"
          size="middle"
          onClick={() => setVisible(true)}
          style={{ width: "100%", color: "var(--primary)", borderRadius: 20 }}
          loading={loading}
        >
          New Ticket
        </Button>
      )}
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{
            siteId: user?.sites.length === 1 ? user?.sites[0].id : null,
          }}
        >
          <Form.Item
            label="Site"
            name="siteId"
            required={false}
            rules={[
              {
                required: true,
                message: "Please select a site.",
              },
            ]}
          >
            <Select showArrow placeholder="Select site">
              {user?.sites.map((site) => (
                <Select.Option key={site.id} value={site.id}>
                  <SiteWithIcon site={site} />
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter a ticket title.",
              },
            ]}
          >
            <Input placeholder="Ticket title" />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter a ticket body.",
              },
            ]}
          >
            <Input.TextArea placeholder="Ticket body" />
          </Form.Item>
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
                  loading={loading}
                  style={{ borderRadius: 20 }}
                  disabled={done}
                >
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default NewTicket;
