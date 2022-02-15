import { Tag } from "antd";
import { Status } from "../../models/Enums";

const StatusTag = ({ status }: { status: Status }) => {
  let color: string | undefined = undefined;
  if (status === "Pending") color = "cyan";
  else if (status === "Open") color = "blue";
  else if (status === "Closed") color = "orange";
  else if (status === "Solved") color = "green";
  else if (status === "Reopened") color = "geekblue";
  return (
    <Tag color={color} style={{ fontWeight: 700, borderRadius: 20 }}>
      {status}
    </Tag>
  );
};

export default StatusTag;
