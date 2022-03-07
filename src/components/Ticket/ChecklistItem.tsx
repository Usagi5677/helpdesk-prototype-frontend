import { useMutation } from "@apollo/client";
import { Checkbox, Spin } from "antd";
import {
  DELETE_CHECKLIST_ITEM,
  TOGGLE_CHECKLIST_ITEM,
} from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import ChecklistItemModel from "../../models/ChecklistItem";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { DATETIME_FORMATS } from "../../helpers/constants";

const ChecklistItem = ({
  item,
  isAdminOrAssigned,
}: {
  item: ChecklistItemModel;
  isAdminOrAssigned: boolean | undefined;
}) => {
  const [deleteChecklistItem, { loading: deleting }] = useMutation(
    DELETE_CHECKLIST_ITEM,
    {
      onCompleted: () => {},
      onError: (error) => {
        errorMessage(error, "Unexpected error while deleting checklist item.");
      },
      refetchQueries: ["ticket"],
    }
  );
  const [toggleChecklistItem, { loading: toggling }] = useMutation(
    TOGGLE_CHECKLIST_ITEM,
    {
      onCompleted: () => {},
      onError: (error) => {
        errorMessage(error, "Unexpected error while updating checklist item.");
      },
      refetchQueries: ["ticket"],
    }
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Checkbox
        checked={item.completedAt !== null}
        disabled={isAdminOrAssigned ? false : true}
        onChange={(e) =>
          toggleChecklistItem({
            variables: { id: item.id, complete: e.target.checked },
          })
        }
        style={{ wordBreak: "break-all" }}
      >
        {item.description}{" "}
        {item.completedAt && (
          <span
            style={{ fontSize: 10, opacity: 0.5, display: "inline-block" }}
            title={moment(item.completedAt).format(DATETIME_FORMATS.FULL)}
          >
            {moment(item.completedAt).format(DATETIME_FORMATS.SHORT)}
          </span>
        )}
      </Checkbox>
      <div style={{ display: "flex", marginRight: 15 }}>
        {(deleting || toggling) && (
          <Spin style={{ marginRight: 5 }} size="small" />
        )}
        {isAdminOrAssigned && !deleting && (
          <CloseCircleOutlined
            style={{
              cursor: "pointer",
              marginLeft: 3,
              color: "rgb(65, 65, 65, 0.5)",
            }}
            onClick={() => {
              deleteChecklistItem({
                variables: {
                  id: item.id,
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
