import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_CHECKLIST_ITEM } from "../../api/mutations";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import { FaTimes } from "react-icons/fa";
import { Spin } from "antd";

const AddChecklistItem = ({ ticket }: { ticket: Ticket }) => {
  const [details, setDetails] = useState("");
  const [addChecklistItem, { loading }] = useMutation(ADD_CHECKLIST_ITEM, {
    onCompleted: () => {
      setDetails("");
    },
    onError: (error) => {
      errorMessage(error, "Unexpected error while adding checklist item.");
    },
    refetchQueries: ["ticket"],
  });

  const submit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setDetails("");
    else if (event.key === "Enter") {
      if (details.trim() === "") return;
      addChecklistItem({
        variables: {
          description: details,
          ticketId: ticket.id,
        },
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: 20,
          padding: 5,
          paddingLeft: 20,
          fontSize: 14,
          width: 150,
          justifyContent: "space--between",
        }}
      >
        <input
          type="text"
          id="AddChecklistItemInput"
          placeholder="Add checklist item"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          onKeyDown={submit}
          style={{ width: 120 }}
        />

        {details !== "" && (
          <>
            {loading ? (
              <Spin
                size="small"
                style={{ marginLeft: -20, marginTop: 3, height: 18 }}
              />
            ) : (
              <FaTimes
                style={{
                  color: "#ccc",
                  cursor: "pointer",
                  fontSize: 20,
                  display: "inline-block",
                  marginLeft: -20,
                }}
                onClick={() => setDetails("")}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AddChecklistItem;
