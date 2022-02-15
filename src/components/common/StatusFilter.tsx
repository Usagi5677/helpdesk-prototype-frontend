import { Select } from "antd";
import { Status } from "../../models/Enums";

const StatusFilter = ({ onChange }: { onChange?: (val: Status) => void }) => {
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
        // Mapping the Status enum after changing it to an array
        options={(Object.keys(Status) as Array<keyof typeof Status>).map(
          (status) => ({
            value: status,
            label: status,
          })
        )}
        placeholder="Filter status"
        onChange={onChange}
        allowClear={true}
      />
    </div>
  );
};

export default StatusFilter;
