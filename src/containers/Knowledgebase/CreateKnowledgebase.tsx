import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { CREATE_KNOWLEDGEBASE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreateKnowledgeBase = () => {
  const [form] = useForm();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [createKnowledgebase, { loading: loadingKnowledgebase }] = useMutation(
    CREATE_KNOWLEDGEBASE,
    {
      onCompleted: () => {
        message.success("Successfully created knowledge base.");
        handleCancel();
        navigate("/knowledgebase");
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while creating knowledge base.");
      },
      refetchQueries: ["getAllKnowledgebase"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const { title, body, mode } = values;
    if (!title) {
      message.error("Please enter a title.");
      return;
    }
    if (!body) {
      message.error("Please enter a description.");
      return;
    }
    createKnowledgebase({
      variables: {
        title,
        body,
        mode,
      },
    });
    
  };

  return (
    <div style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "40px",
    }}>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        id="myForm"
        initialValues={{ mode: "Public" }}
      >
        <Form.Item
          label="Title"
          name="title"
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter a title.",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter a description.",
            },
          ]}
        >
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </Form.Item>
        <Form.Item label="Mode" name="mode">
          <Radio.Group buttonStyle="solid" optionType="button">
            <Radio.Button value="Public">Public</Radio.Button>
            <Radio.Button value="Private">Private</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <div style={{ opacity: 0.5, marginBottom: "1rem", marginTop: -5 }}>
          <div>Public knowledge base are visible to all users.</div>
          <div>Private knowledge base are only visible to admins and agents.</div>
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
                loading={loadingKnowledgebase}
                style={{ borderRadius: 20 }}
              >
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateKnowledgeBase;
