import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ADD_SITE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";

const AddSite = () => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [addSite, { loading: loadingAddSite }] = useMutation(ADD_SITE, {
    onCompleted: () => {
      message.success("Successfully added site.");
      handleCancel();
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while adding site.");
    },
    refetchQueries: ["sites"],
  });

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const { name, mode } = values;
    if (!name) {
      message.error("Please enter a name.");
      return;
    }
    addSite({
      variables: {
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
        style={{ width: "100%", color: "var(--primary)", borderRadius: 20 }}
        loading={loadingAddSite}
      >
        Add Site
      </Button>
      <Modal visible={visible} closable={false} footer={null}>
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
                message: "Please enter a site name.",
              },
            ]}
          >
            <Input placeholder="Site name" />
          </Form.Item>
          <Form.Item label="Mode" name="mode">
            <Radio.Group buttonStyle="solid" optionType="button">
              <Radio.Button value="Public">Public</Radio.Button>
              <Radio.Button value="Private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div style={{ opacity: 0.5, marginBottom: "1rem", marginTop: -5 }}>
            <div>Public sites can be accessed by all employees.</div>
            <div>
              Private sites can only be accessed by employees who have been
              granted access.
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
                  loading={loadingAddSite}
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

export default AddSite;
