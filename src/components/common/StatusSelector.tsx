import { useMutation } from "@apollo/client";
import { Select } from "antd";
import { SET_TICKET_STATUS } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { Status } from "../../models/Enums";
import Ticket from "../../models/Ticket";

const StatusSelector = ({ ticket }: { ticket: Ticket }) => {
  const [setTicketPriority, { loading: settingPriority }] = useMutation(
    SET_TICKET_STATUS,
    {
      onCompleted: () => {},
      onError: (error) => {
        errorMessage(error, "Unexpected error occured.");
      },
      refetchQueries: ["ticket"],
    }
  );

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        alignItems: "center",
        width: 150,
      }}
    >
      <Select
        showArrow
        loading={settingPriority}
        style={{ width: "100%" }}
        bordered={false}
        options={(Object.keys(Status) as Array<keyof typeof Status>).map(
          (p) => ({
            value: p,
            label: p,
          })
        )}
        placeholder="Select status"
        value={ticket?.status}
        onChange={(status) =>
          setTicketPriority({ variables: { ticketId: ticket.id, status } })
        }
      />
    </div>
  );
};

export default StatusSelector;
