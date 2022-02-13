import { useLazyQuery, useMutation } from "@apollo/client";
import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { ADD_FOLLOWER } from "../../api/mutations";
import { SEARCH_APS_QUERY } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import User from "../../models/User";

const FollowerAdder = ({
  ticket,
}: {
  onChange?: (val: number[]) => void;
  ticket: Ticket;
}) => {
  const [selection, setSelection] = useState<string | null>(null);

  const [searchEmployee, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_APS_QUERY);

  useEffect(() => {
    if (selection) {
      assignAgents({
        variables: { newFollowerUserId: selection, ticketId: ticket.id },
      });
    }
  }, [selection]);

  const [assignAgents, { loading: assigning }] = useMutation(ADD_FOLLOWER, {
    onCompleted: () => {
      setSelection(null);
    },
    onError: (error) => {
      setSelection(null);
      errorMessage(error, "Unexpected error while adding follower.");
    },
    refetchQueries: ["ticket"],
  });

  const [timerId, setTimerId] = useState(null);

  const fetchUsers = (value: string) => {
    if (value.length > 1 && value.length < 20) {
      searchEmployee({
        variables: {
          query: value,
        },
      });
    }
  };

  const fetchDebounced = (value: string) => {
    if (timerId) clearTimeout(timerId);
    //@ts-ignore
    setTimerId(setTimeout(() => fetchUsers(value), 500));
  };

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
        loading={assigning || searchLoading}
        style={{ width: "100%" }}
        bordered={false}
        onSearch={(value) => fetchDebounced(value)}
        placeholder="Add followers"
        notFoundContent={searchLoading ? <Spin size="small" /> : null}
        filterOption={false}
        value={selection}
        onChange={setSelection}
        showSearch
        allowClear
      >
        {searchData?.searchAPSUsers.map((user: User) => (
          <Select.Option key={user.userId} value={user.userId}>
            {user.fullName} ({user.rcno})
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default FollowerAdder;
