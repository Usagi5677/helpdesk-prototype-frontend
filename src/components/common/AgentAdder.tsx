import { useLazyQuery, useMutation } from "@apollo/client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { ASSIGN_AGENTS } from "../../api/mutations";
import { SEARCH_USERS_AND_USERGROUPS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import SearchResult from "../../models/SearchResult";

const AgentAdder = ({
  ticket,
}: {
  onChange?: (val: number[]) => void;
  ticket: Ticket;
}) => {
  const [selection, setSelection] = useState<string | null>(null);

  const [searchEmployees, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_USERS_AND_USERGROUPS);

  useEffect(() => {
    searchEmployees({
      variables: { query: "", siteId: ticket.site.id, onlyAgents: true },
    });
  }, [searchEmployees, ticket]);

  const [assignAgents, { loading: assigning }] = useMutation(ASSIGN_AGENTS, {
    onCompleted: () => {
      setSelection(null);
    },
    onError: (error) => {
      setSelection(null);
      errorMessage(error, "Unexpected error while assigning agents.");
    },
    refetchQueries: ["ticket"],
  });

  useEffect(() => {
    if (selection) {
      const result: SearchResult = JSON.parse(selection);
      let userIds: any = [];
      if (result.type === "User") {
        userIds.push(result.user?.id);
      } else if (result.type === "UserGroup") {
        userIds = result.userGroup?.users?.map((u) => u.id);
      }
      if (userIds.length > 0) {
        assignAgents({ variables: { ticketId: ticket.id, agentIds: userIds } });
      }
    }
  }, [selection, assignAgents, ticket]);

  const [timerId, setTimerId] = useState(null);

  const fetchUsers = (value: string) => {
    if (value.length > 1 && value.length < 20) {
      searchEmployees({
        variables: {
          query: value,
          onlyAgents: true,
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
        showArrow
        loading={assigning || searchLoading}
        style={{ width: "100%" }}
        bordered={false}
        onSearch={(value) => fetchDebounced(value)}
        placeholder="Add agents"
        value={selection}
        onChange={setSelection}
        showSearch
      >
        {searchData?.searchUsersAndGroups
          .filter(
            (res: SearchResult) =>
              res.type !== "User" ||
              !ticket?.agents.map((a: any) => a.id).includes(res?.user?.id)
          )
          .map((res: SearchResult) => (
            <Select.Option key={res.name} value={JSON.stringify(res)}>
              {res.type === "User" && (
                <>
                  {res.user?.fullName} ({res.user?.rcno})
                </>
              )}
              {res.type === "UserGroup" && <>{res.userGroup?.name}</>}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default AgentAdder;
