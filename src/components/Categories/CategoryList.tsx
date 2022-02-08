import classes from "../Users/UserList.module.css";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import { Button, message, Popconfirm } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Category from "../../models/Category";
import EditCategory from "./EditCategory";
import { FaTrash } from "react-icons/fa";

const CategoryList = ({ category }: { category: Category }) => {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <DefaultAvatar
            fullname={category.name}
            userAvatarWidth={"36px"}
            userAvatarHeight={"36px"}
            showAgentList={false}
          />
          <div style={{ marginLeft: ".5rem" }}>{category.name}</div>
        </div>
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
                color: "var(--primary)",
                marginLeft: "1rem",
                border: "none",
              }}
              loading={deleting}
            />
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
