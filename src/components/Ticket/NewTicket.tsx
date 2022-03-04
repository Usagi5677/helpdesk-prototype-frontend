import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Row, Tooltip } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { CREATE_TICKET } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FaPlusCircle } from "react-icons/fa";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";

const NewTicket = ({ type }: { type?: "Text" | "Icon" | "Card" }) => {
  if (!type) type = "Text";
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [createTicket, { loading }] = useMutation(CREATE_TICKET, {
    onCompleted: (data) => {
      message.success("Successfully created ticket.");
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
    const { title, body } = values;
    createTicket({
      variables: {
        title,
        body,
      },
    });
  };

  const isSmallDevice = useIsSmallDevice();

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
      ) : type === "Card" ? (
        <div
          className="dashboardCard"
          style={{
            height: "100%",
            backgroundColor: "white",
            borderRadius: 20,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "10px 40px",
            display: "flex",
            flexDirection: isSmallDevice ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setVisible(true)}
        >
          <FaPlusCircle
            style={{
              height: isSmallDevice ? 30 : 50,
              width: isSmallDevice ? 30 : 50,
              color: "#1c6493",
            }}
          />
          <div
            style={{
              fontSize: 15,
              margin: isSmallDevice ? "0 0 0 10px" : "10px 0 0 0",
            }}
          >
            New Ticket
          </div>
        </div>
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
        >
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
