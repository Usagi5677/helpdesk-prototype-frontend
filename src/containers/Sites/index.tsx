import { useLazyQuery } from "@apollo/client";
import { SITES } from "../../api/queries";
import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { errorMessage } from "../../helpers/gql";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import Search from "../../components/common/Search";
import Site from "../../models/Site";
import SiteList from "../../components/Sites/SiteList";
import AddSite from "../../components/Sites/AddSite";

const Sites = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to home if not a super admin
  if (!user?.isSuperAdmin) {
    navigate("/");
  }

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Site[]>([]);
  const [getSites, { data, loading }] = useLazyQuery(SITES, {
    onError: (err) => {
      errorMessage(err, "Error loading sites.");
    },
  });

  // Fetch sites when component mounts
  useEffect(() => {
    getSites({ variables: { first: 500 } });
  }, [getSites]);

  // Filter sites based on the search value. This function will run
  // whenever search and data changes
  useEffect(() => {
    // If sites have not been fetched yet, return
    if (!data) return;
    // If search value is empty, all usergroups are shown
    if (search === "") {
      setFiltered(data?.sites);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        data?.sites.filter((site: Site) =>
          site.name.toLowerCase().includes(lower)
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
        <Search
          searchValue={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setSearch("")}
        />
        <div>
          <AddSite />
        </div>
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {filtered.map((site: Site) => (
        <SiteList site={site} key={site.id} />
      ))}
    </div>
  );
};

export default Sites;
