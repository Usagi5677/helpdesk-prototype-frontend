import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, message, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { EDIT_SITE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaEdit } from "react-icons/fa";
import Site from "../../models/Site";

const EditSite = ({ site }: { site: Site }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const [editSite, { loading: loadingEditSite }] = useMutation(EDIT_SITE, {
    onCompleted: () => {
      message.success("Successfully updated site.");
      handleCancel();
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while updating site.");
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
      message.error("Please enter a site name.");
      return;
    }
    editSite({
      variables: {
        id: site.id,
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
        icon={<FaEdit style={{ fontSize: 20, marginRight: -3 }} />}
        shape="round"
        style={{ color: "var(--primary)", border: "none" }}
        loading={loadingEditSite}
      />
      <Modal visible={visible} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          id="myForm"
          initialValues={{ name: site.name, mode: site.mode }}
        >
          <Form.Item
            label="Site"
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
                  loading={loadingEditSite}
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

export default EditSite;
