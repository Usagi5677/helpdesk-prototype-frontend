import { FaSearch, FaTimes } from "react-icons/fa";
import classes from "./Users.module.css";
import { useLazyQuery } from "@apollo/client";
import { APP_USERS_QUERY } from "../../api/queries";
import { useEffect, useState } from "react";
import User from "../../models/User";
import UserList from "../../components/UserList/UserList";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filered, setFiltered] = useState<User[]>([]);
  const [getAppUsers, { data, loading }] = useLazyQuery(APP_USERS_QUERY, {
    onError: (err) => {
      console.log(err);
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
    <div className={classes["users-container"]}>
      <div className={classes["users-search_wrapper"]}>
        <div className={classes["users-search_wrapper_icon"]}>
          <FaSearch />
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search !== "" && (
          <div
            style={{ color: "#ccc", paddingRight: 10, cursor: "pointer" }}
            onClick={() => setSearch("")}
          >
            <FaTimes />
          </div>
        )}
      </div>
      {filered.map((u: User) => (
        <UserList user={u} key={u.id} />
      ))}
    </div>
  );
};

export default Users;
