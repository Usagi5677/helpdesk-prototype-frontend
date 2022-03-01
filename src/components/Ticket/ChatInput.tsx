import { Button, Input, message, Switch, Tooltip, Upload } from "antd";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { useContext, useRef, useState } from "react";
import Ticket from "../../models/Ticket";
import UserContext from "../../contexts/UserContext";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import axios from "axios";

const ChatInput = ({ ticket }: { ticket: Ticket }) => {
  const { user } = useContext(UserContext);
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [value, setValue] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const inputRef = useRef<any>(null);
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setValue("");
      setIsPublic(true);
      inputRef.current.focus();
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while occured.");
    },
    refetchQueries: ["notifications"],
  });

  const send = () => {
    if (value.trim() === "") return;
    addComment({
      variables: { body: value, ticketId: ticket.id, isPublic },
    });
  };

  // Whenever file is selected, upload
  const handleFile = (file: any) => {
    if (file.file.status === "removed") return;
    // Max allowed file size in bytes.
    const maxFileSize = 2 * 1000000;
    if (file.file.size > maxFileSize) {
      message.error("File size cannot be greater than 2 MB.");
      return;
    }
    setUploading(true);
    // Send request as form data as files cannot be sent through graphql
    const data: any = new FormData();
    data.append("ticketId", `${ticket.id}`);
    data.append("description", value.trim());
    data.append("attachment", file.file);
    const token = localStorage.getItem("helpdesk_token");
    const url = `${
      process.env.REACT_APP_API_URL?.split("graphql")[0]
    }attachment/upload`;
    axios({
      method: "post",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(function () {
        setValue("");
        inputRef.current.focus();
      })
      .catch(function (error) {
        message.error(error.response.data.message);
      })
      .finally(function () {
        setUploading(false);
      });
  };

  return (
    <div style={{ display: "flex", height: 100 }}>
      <div
        style={{
          height: "100%",
          border: "1px solid rgb(210, 210, 210)",
          borderRadius: 20,
          padding: 10,
          flex: 1,
        }}
      >
        <Input.TextArea
          bordered={false}
          placeholder="Enter message"
          disabled={loading}
          value={value}
          autoFocus
          ref={inputRef}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onPressEnter={() => send()}
          style={{
            resize: "none",
            padding: 0,
            margin: 0,
          }}
        />
      </div>
      <div
        style={{
          marginLeft: "10px",
          width: 70,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {(user?.isAdmin || user?.isAgent) && (
          <div style={{ marginBottom: 5 }}>
            <Switch
              checkedChildren="Public"
              unCheckedChildren="Private"
              checked={isPublic}
              onChange={setIsPublic}
            />
          </div>
        )}
        <Tooltip title="Send">
          <Button
            icon={<SendOutlined />}
            shape="round"
            style={{ width: "100%", marginBottom: 5 }}
            loading={loading}
            onClick={() => send()}
          />
        </Tooltip>
        <Tooltip title="Upload attachment">
          <Upload
            onRemove={() => {
              setFileList([]);
            }}
            beforeUpload={(file) => {
              setFileList([file]);
              return false;
            }}
            fileList={fileList}
            onChange={(val: UploadChangeParam) => handleFile(val)}
            showUploadList={false}
          >
            <Button
              icon={<UploadOutlined style={{ width: 36 }} />}
              shape="round"
              style={{ width: "100%" }}
              loading={uploading}
            />
          </Upload>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatInput;
