import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { CREATE_KNOWLEDGEBASE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import ReactQuill from "react-quill";
import sanitizeHtml from "sanitize-html";
import "react-quill/dist/quill.snow.css";
import classes from "./KnowledgebaseCard.module.css";

const AddKnowledgebase = () => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [value, setValue] = useState("");

  const [createKnowledgebase, { loading: loadingKnowledgebase }] = useMutation(
    CREATE_KNOWLEDGEBASE,
    {
      onCompleted: () => {
        message.success("Successfully created knowledge base.");
        handleCancel();
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while creating knowledge base.");
      },
      refetchQueries: ["getAllKnowledgebase"],
    }
  );

  const handleCancel = () => {
    form.resetFields();
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

    //sanitize tags
    const dirty = body;
    const sanitizedBody = sanitizeHtml(dirty, {
      allowedTags: [
        "address",
        "article",
        "aside",
        "footer",
        "header",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hgroup",
        "main",
        "nav",
        "section",
        "blockquote",
        "dd",
        "div",
        "dl",
        "dt",
        "figcaption",
        "figure",
        "hr",
        "li",
        "main",
        "ol",
        "p",
        "pre",
        "ul",
        "a",
        "abbr",
        "b",
        "bdi",
        "bdo",
        "br",
        "cite",
        "code",
        "data",
        "dfn",
        "em",
        "i",
        "kbd",
        "mark",
        "q",
        "rb",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "samp",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "time",
        "u",
        "var",
        "wbr",
        "caption",
        "col",
        "colgroup",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "tr",
      ],
      allowedAttributes: {
        a: ["href"],
      },
    });

    createKnowledgebase({
      variables: {
        title,
        body: sanitizedBody,
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
        loading={loadingKnowledgebase}
        className={classes["btn-primary"]}
      >
        Create knowledge base
      </Button>
      <Modal visible={visible} onCancel={handleCancel} footer={null} width="90vw">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{ mode: "Public" }}
        >
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
      </Modal>
    </>
  );
};

export default AddKnowledgebase;
