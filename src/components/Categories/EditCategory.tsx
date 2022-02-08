import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { EDIT_CATEGORY } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Category from "../../models/Category";
import { FaEdit } from "react-icons/fa";

const EditCategory = ({ category }: { category: Category }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [editCategory, { loading: loadingEditCategory }] = useMutation(
    EDIT_CATEGORY,
    {
      onCompleted: () => {
        message.success("Successfully updated category.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while updating category.");
      },
      refetchQueries: ["categories"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { name } = values;
    if (!name) {
      message.error("Please enter a category name.");
      return;
    }
    editCategory({
      variables: {
        id: category.id,
        name,
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
        style={{ color: "var(--primary)", border: "none" }}
        loading={loadingEditCategory}
      />
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{ name: category.name }}
        >
          <Form.Item
            label="Category"
            name="name"
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
                  loading={loadingEditCategory}
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

export default EditCategory;
