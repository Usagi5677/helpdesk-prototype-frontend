import { useMutation } from "@apollo/client";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Tooltip,
} from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { EDIT_KNOWLEDGEBASE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaPen } from "react-icons/fa";
import classes from "./KnowledgebaseCard.module.css";
import KnowledgebaseModel from "../../models/Knowledgebase";
import ReactQuill from "react-quill";

const EditKnowledgebase = ({
  knowledgebase,
}: {
  knowledgebase: KnowledgebaseModel;
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [value, setValue] = useState("");

  const [editKnowledgebase, { loading: loadingEditKnowledgebase }] =
    useMutation(EDIT_KNOWLEDGEBASE, {
      onCompleted: () => {
        message.success("Successfully updated knowledge base.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while updating knowledge base.");
      },
      refetchQueries: ["getAllKnowledgebase"],
    });

  const handleCancel = () => {
    setVisible(false);
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
    if (mode !== "Public" && mode !== "Private") {
      message.error("Invalid mode.");
      return;
    }
    editKnowledgebase({
      variables: {
        id: knowledgebase.id,
        title,
        body,
        mode,
      },
    });
  };

  return (
    <>
      <Tooltip title={"Edit"} placement="top">
        <Button
          key="edit"
          htmlType="button"
          size="middle"
          icon={<FaPen />}
          onClick={() => setVisible(true)}
          className={classes["btn-secondary"]}
        />
      </Tooltip>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width="90vw"
        style={{ maxWidth: 700 }}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{
            title: knowledgebase.title,
            body: knowledgebase.body,
            mode: knowledgebase.mode,
          }}
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
            <div>
              Private knowledge base are only visible to admins and agents.
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
                  loading={loadingEditKnowledgebase}
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

export default EditKnowledgebase;
