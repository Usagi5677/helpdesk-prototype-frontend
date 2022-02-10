import { useMutation } from "@apollo/client";
import { Select } from "antd";
import { SET_TICKET_PRIORITY } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import { Priority } from "../../models/Enums";
import Ticket from "../../models/Ticket";

const PrioritySelector = ({ ticket }: { ticket: Ticket }) => {
  const [setTicketPriority, { loading: settingPriority }] = useMutation(
    SET_TICKET_PRIORITY,
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
        options={(Object.keys(Priority) as Array<keyof typeof Priority>).map(
          (p) => ({
            value: p,
            label: p,
          })
        )}
        placeholder="Select priority"
        value={ticket?.priority}
        onChange={(priority) =>
          setTicketPriority({ variables: { ticketId: ticket.id, priority } })
        }
      />
    </div>
  );
};

export default PrioritySelector;
