import { Select } from "antd";
import Site from "../../models/Site";

const SiteFilter = ({
  onChange,
  value,
  allowClear,
  sites,
}: {
  onChange?: (val: number) => void;
  value?: number | null;
  allowClear?: boolean;
  sites?: Site[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        marginRight: "1rem",
        alignItems: "center",
      }}
    >
      <Select
        showArrow
        style={{ minWidth: 179 }}
        bordered={false}
        placeholder="Filter site"
        onChange={onChange}
        allowClear={allowClear}
        value={value}
      >
        {sites?.map((site: Site) => (
          <Select.Option key={site.id} value={site.id}>
            {site.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SiteFilter;
