import { useQuery } from "@apollo/client";
import { Select, Tag } from "antd";
import { CATEGORIES_QUERY } from "../../api/queries";
import { stringToColor } from "../../helpers/style";
import Category from "../../models/Category";

const CategorySelector = ({
  onChange,
}: {
  onChange?: (val: number[]) => void;
}) => {
  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: { first: 500 },
  });

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={stringToColor(label)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

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
        mode="multiple"
        showArrow
        loading={loading}
        tagRender={tagRender}
        style={{ minWidth: 179 }}
        bordered={false}
        options={data?.categories.edges.map((c: { node: Category }) => ({
          value: c.node.id,
          label: c.node.name,
        }))}
        placeholder="Filter categories"
        onChange={onChange}
      />
    </div>
  );
};

export default CategorySelector;
