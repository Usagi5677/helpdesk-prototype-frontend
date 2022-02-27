import { Select } from "antd";
import { Status } from "../../models/Enums";
import StatusTag from "./StatusTag";

const StatusFilter = ({
  onChange,
  value,
}: {
  onChange?: (val: Status) => void;
  value: Status | null;
}) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        marginLeft: "1rem",
        alignItems: "center",
      }}
    >
      <Select
        showArrow
        style={{ minWidth: 179 }}
        bordered={false}
        placeholder="Filter status"
        onChange={onChange}
        allowClear={true}
        value={value}
      >
        {(Object.keys(Status) as Array<keyof typeof Status>).map(
          (status: any) => (
            <Select.Option key={status} value={status}>
              <StatusTag status={status} />
            </Select.Option>
          )
        )}
      </Select>
    </div>
  );
};

export default StatusFilter;
