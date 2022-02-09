import { FaSearch, FaTimes } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";
import { USER_GROUPS_QUERY } from "../../api/queries";
import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { errorMessage } from "../../helpers/gql";
import UserContext from "../../contexts/UserContext";
import UserGroup from "../../models/UserGroup";
import UserGroupList from "../../components/UserGroups/UserGroupList";
import AddUserGroup from "../../components/UserGroups/AddUserGroup";
import { useNavigate } from "react-router";

const UserGroups = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to home if not an admin or agent
  if (!user?.isAdmin && !user?.isAgent) {
    navigate("/");
  }

  const [search, setSearch] = useState("");
  const [filered, setFiltered] = useState<UserGroup[]>([]);
  const [getUserGroups, { data, loading }] = useLazyQuery(USER_GROUPS_QUERY, {
    onError: (err) => {
      errorMessage(err, "Error loading user groups.");
    },
  });

  // Fetch user groups when component mounts
  useEffect(() => {
    getUserGroups({ variables: { first: 500 } });
  }, []);

  // Filter user groups based on the search value. This function will run
  // whenever search and data changes
  useEffect(() => {
    // If user groups have not been fetched yet, return
    if (!data) return;
    // Mapping the fetched data to an array of user groups as the data from the
    // API is in a form optimized for pagination
    const userGroups = data?.userGroups.edges.map(
      (c: { node: UserGroup }) => c.node
    );
    // If search value is empty, all usergroups are shown
    if (search === "") {
      setFiltered(userGroups);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        userGroups.filter((userGroup: UserGroup) =>
          userGroup.name.toLowerCase().includes(lower)
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
        {user?.isAdmin && (
          <div>
            <AddUserGroup />
          </div>
        )}
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {filered.map((userGroup: UserGroup) => (
        <UserGroupList userGroup={userGroup} key={userGroup.id} />
      ))}
    </div>
  );
};

export default UserGroups;
