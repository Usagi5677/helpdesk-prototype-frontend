import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ADD_CATEGORY } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";

const AddCategory = () => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addCategory, { loading: loadingAddCategory }] = useMutation(
    ADD_CATEGORY,
    {
      onCompleted: () => {
        message.success("Successfully added category.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while adding category.");
      },
      refetchQueries: ["categories"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { category } = values;
    if (!category) {
      message.error("Please enter a category.");
      return;
    }
    addCategory({
      variables: {
        name: category,
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
        Add Category
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
            label="Category"
            name="category"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter a category name.",
              },
            ]}
          >
            <Input placeholder="Category name" />
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
                  loading={loadingAddCategory}
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

export default AddCategory;
