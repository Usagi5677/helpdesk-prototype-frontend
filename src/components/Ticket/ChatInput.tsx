import { Button, Input, Switch, Tooltip } from "antd";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { useState } from "react";
import Ticket from "../../models/Ticket";

const ChatInput = ({ ticket }: { ticket: Ticket }) => {
  const [value, setValue] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setValue("");
      setIsPublic(true);
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while occured.");
    },
    refetchQueries: ["ticket"],
  });

  const send = () => {
    if (value.trim() === "") return;
    addComment({
      variables: { body: value, ticketId: ticket.id, isPublic },
    });
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
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
          onChange={(e) => setValue(e.target.value)}
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
        <div style={{ marginBottom: 5 }}>
          <Switch
            checkedChildren="Public"
            unCheckedChildren="Private"
            checked={isPublic}
            onChange={setIsPublic}
          />
        </div>
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
          <Button
            icon={<UploadOutlined />}
            shape="round"
            style={{ width: "100%" }}
            loading={loading}
            onClick={() => send()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatInput;
