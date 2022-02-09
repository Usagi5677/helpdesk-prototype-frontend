import classes from "../Users/UserList.module.css";
import { Button, message, Popconfirm, Tag } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Category from "../../models/Category";
import EditCategory from "./EditCategory";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { stringToColor } from "../../helpers/style";

const CategoryList = ({ category }: { category: Category }) => {
  const { user } = useContext(UserContext);
  const [removeCategory, { loading: deleting }] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      message.success("Successfully removed category.");
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while removing category.");
    },
    refetchQueries: ["categories"],
  });
  const remove = () => {
    removeCategory({
      variables: {
        id: category.id,
      },
    });
  };
  return (
    <div className={classes["user-list-wrapper"]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          lineHeight: 2,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
        >
          <Tag color={stringToColor(category.name)}>{category.name}</Tag>
        </div>
        {user?.isAdmin && (
          <div>
            <EditCategory category={category} />
            <Popconfirm
              disabled={deleting}
              title={`Are you sure to remove this category?`}
              onConfirm={() => remove()}
              okText="Confirm"
              cancelText="No"
              placement="topRight"
            >
              <Button
                htmlType="button"
                size="middle"
                icon={<FaTrash style={{ fontSize: 20 }} />}
                shape="round"
                style={{
                  color: "var(--error)",
                  marginLeft: "1rem",
                  border: "none",
                }}
                loading={deleting}
              />
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
