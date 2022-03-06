import { useQuery } from "@apollo/client";
import { Select, Tag } from "antd";
import React from "react";
import { CATEGORIES_QUERY } from "../../api/queries";
import { stringToColor } from "../../helpers/style";
import Category from "../../models/Category";

const CategorySelector = ({
  onChange,
  minWidth,
  marginLeft,
}: {
  onChange?: (val: number[]) => void;
  minWidth?: number;
  marginLeft?: string;
}) => {
  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: { first: 500 },
  });

  const tagRender = ({
    label,
    value,
    disabled,
    onClose,
    closable,
  }: {
    label: React.ReactNode;
    value: any;
    disabled: boolean;
    onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    closable: boolean;
  }) => {
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={stringToColor(value)}
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
        marginLeft,
        alignItems: "center",
      }}
    >
      <Select
        mode="multiple"
        showArrow
        loading={loading}
        tagRender={tagRender}
        style={{ minWidth: minWidth ?? "100%" }}
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
