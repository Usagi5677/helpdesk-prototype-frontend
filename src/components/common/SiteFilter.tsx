import { Select } from "antd";
import Site from "../../models/Site";
import SiteWithIcon from "./SiteWithIcon";

const SiteFilter = ({
  onChange,
  value,
  allowClear,
  sites,
  margin,
}: {
  onChange?: (val: number) => void;
  value?: number | null;
  allowClear?: boolean;
  sites?: Site[];
  margin?: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        margin,
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
            <SiteWithIcon site={site} />
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SiteFilter;
