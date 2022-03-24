import { useQuery } from "@apollo/client";
import { Select, Tag } from "antd";
import { CATEGORIES_WITH_ACCESS } from "../../api/queries";
import { stringToColor } from "../../helpers/style";
import Category from "../../models/Category";
import SiteWithIcon from "./SiteWithIcon";

const CategorySelector = ({
  onChange,
  minWidth,
  margin,
}: {
  onChange?: (val: number[]) => void;
  minWidth?: number;
  margin?: string;
}) => {
  const { data, loading } = useQuery(CATEGORIES_WITH_ACCESS);
  const onPreventMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

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
        mode="multiple"
        showArrow
        loading={loading}
        style={{ minWidth: minWidth ?? "100%" }}
        bordered={false}
        placeholder="Filter categories"
        onChange={onChange}
        optionFilterProp="children"
        filterOption={(input, option: any) => {
          return option.id.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {data?.categoriesWithAccess.map((c: Category) => (
          <Select.Option value={c.id} key={c.id} id={c.name}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: ".25rem" }}>
                <SiteWithIcon site={c.site} small />
              </div>
              <Tag
                color={stringToColor(c.name)}
                onMouseDown={onPreventMouseDown}
                style={{ marginRight: 3 }}
              >
                {c.name}
              </Tag>
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default CategorySelector;
