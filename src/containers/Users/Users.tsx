import { FaSearch, FaTimes } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";
import { APP_USERS_QUERY } from "../../api/queries";
import { useEffect, useState } from "react";
import User from "../../models/User";
import UserList from "../../components/UserList/UserList";
import { Spin } from "antd";
import "antd/lib/spin/style/css";
import AddAppUser from "../../components/AddAppUser";
import { errorMessage } from "../../helpers/gql";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filered, setFiltered] = useState<User[]>([]);
  const [getAppUsers, { data, loading }] = useLazyQuery(APP_USERS_QUERY, {
    onError: (err) => {
      errorMessage(err, "Error loading app users.");
    },
  });

  useEffect(() => {
    getAppUsers();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (search === "") {
      setFiltered(data?.appUsers);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        data?.appUsers.filter(
          (user: User) =>
            user.fullName.toLowerCase().includes(lower) ||
            user.rcno.toString().toLowerCase().includes(lower)
        )
      );
    }
  }, [search, data]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "10px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: 20,
            padding: 5,
            paddingLeft: 10,
          }}
        >
          <FaSearch style={{ color: "#ccc", paddingRight: 10, fontSize: 25 }} />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search !== "" && (
            <FaTimes
              style={{
                color: "#ccc",
                paddingRight: 10,
                cursor: "pointer",
                fontSize: 25,
                marginLeft: -25,
              }}
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <div>
          <AddAppUser />
        </div>
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {filered.map((u: User) => (
        <UserList user={u} key={u.id} />
      ))}
    </div>
  );
};

export default Users;
