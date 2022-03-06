import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { GIVE_FEEDBACK } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import UserContext from "../../contexts/UserContext";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const GiveFeedback = ({ ticket }: { ticket: Ticket }) => {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [form] = useForm();

  const [giveFeedback, { loading }] = useMutation(GIVE_FEEDBACK, {
    onCompleted: () => {
      message.success("Successfully given ticket feedback.");
      handleCancel();
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while giving feedback.");
    },
    refetchQueries: ["ticket"],
  });

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { feedback } = values;

    if (!rating) {
      message.error("Please select a ticket rating.");
      return;
    }

    giveFeedback({
      variables: {
        ticketId: ticket.id,
        rating,
        feedback: feedback ?? "",
      },
    });
  };

  // Only show to ticket creator when ticket status is "Closed" or "Solved"
  // and a rating does not exist
  useEffect(() => {
    if (
      ticket &&
      !ticket.rating &&
      ticket.createdBy.id === user?.id &&
      ["Closed", "Solved"].includes(ticket.status)
    ) {
      setVisible(true);
    }
  }, [ticket, user]);

  return (
    <>
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
        >
          <Form.Item label="Rating">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[1, 2, 3, 4, 5].map((st) => (
                <div
                  key={st}
                  onClick={() => setRating(st)}
                  style={{ cursor: "pointer", color: "gold" }}
                >
                  {rating && rating >= st ? (
                    <StarFilled style={{ fontSize: 40 }} />
                  ) : (
                    <StarOutlined style={{ fontSize: 40 }} />
                  )}
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Feedback" name="feedback" required={false}>
            <Input.TextArea placeholder="Ticket feedback" />
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
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default GiveFeedback;
