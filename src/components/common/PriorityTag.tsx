import { Tag } from "antd";
import { Priority } from "../../models/Enums";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const PriorityTag = ({ priority }: { priority: Priority | undefined }) => {
  if (priority === "Low") return <Tag color="default">{priority}</Tag>;
  else if (priority === "Normal") return <Tag color="volcano">{priority}</Tag>;
  else if (priority === "High")
    return (
      <Tag color="error" icon={<ExclamationCircleOutlined />}>
        {priority}
      </Tag>
    );
  else return <div></div>;
};

export default PriorityTag;
