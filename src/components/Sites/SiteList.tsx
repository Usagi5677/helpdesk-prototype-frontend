import classes from "../Users/UserList.module.css";
import { Button, message, Popconfirm } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_SITE } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { FaLock, FaTrash } from "react-icons/fa";
import Site from "../../models/Site";
import EditSite from "./EditSite";
import SiteWithIcon from "../common/SiteWithIcon";

const SiteList = ({ site }: { site: Site }) => {
  const [removeSite, { loading: deleting }] = useMutation(DELETE_SITE, {
    onCompleted: () => {
      message.success("Successfully removed site.");
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while removing site.");
    },
    refetchQueries: ["sites"],
  });
  const remove = () => {
    removeSite({
      variables: {
        id: site.id,
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
          <SiteWithIcon site={site} showName={true} />
          {site.mode === "Private" && (
            <FaLock style={{ marginLeft: ".5rem" }} />
          )}
        </div>
        <div>
          <EditSite site={site} />
          <Popconfirm
            disabled={deleting}
            title={`Are you sure to remove this site?`}
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
      </div>
    </div>
  );
};

export default SiteList;
