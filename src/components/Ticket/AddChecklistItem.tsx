import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ADD_CHECKLIST_ITEM } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";

const AddChecklistItem = ({ ticket }: { ticket: Ticket }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addChecklistItem, { loading }] = useMutation(ADD_CHECKLIST_ITEM, {
    onCompleted: () => {
      handleCancel();
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while adding checklist item.");
    },
    refetchQueries: ["ticket"],
  });

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { details } = values;
    addChecklistItem({
      variables: {
        description: details,
        ticketId: ticket.id,
      },
    });
  };

  return (
    <>
      <Button
        htmlType="button"
        size="middle"
        onClick={() => setVisible(true)}
        style={{ color: "var(--primary)", borderRadius: 20, marginLeft: 20 }}
        loading={loading}
      >
        Add Checklist Item
      </Button>
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
        >
          <Form.Item
            label="Details"
            name="details"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter checklist item details.",
              },
            ]}
          >
            <Input placeholder="Checklist item details" />
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

export default AddChecklistItem;
