import { useLazyQuery } from "@apollo/client";
import { Select, Spin } from "antd";
import { useState } from "react";
import { SEARCH_APS_QUERY } from "../../api/queries";
import User from "../../models/User";

const UserFilter = ({ onChange }: { onChange: (val: User) => void }) => {
  const [selection, setSelection] = useState<string | null>(null);

  const [searchEmployee, { data: searchData, loading: searchLoading }] =
    useLazyQuery(SEARCH_APS_QUERY);

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

  const handleChange = (val: string) => {
    setSelection(val);
    onChange(
      searchData?.searchAPSUsers.find((emp: User) => emp.userId === val)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        alignItems: "center",
        width: 179,
        marginLeft: "1rem",
      }}
    >
      <Select
        loading={searchLoading}
        style={{ width: "100%" }}
        bordered={false}
        onSearch={(value) => fetchDebounced(value)}
        placeholder="Filter user"
        notFoundContent={searchLoading ? <Spin size="small" /> : null}
        filterOption={false}
        value={selection}
        onChange={handleChange}
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

export default UserFilter;
