import { useLazyQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../../api/queries";
import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { errorMessage } from "../../helpers/gql";
import UserContext from "../../contexts/UserContext";
import Category from "../../models/Category";
import CategoryList from "../../components/Categories/CategoryList";
import AddCategory from "../../components/Categories/AddCategory";
import { useNavigate } from "react-router";
import Search from "../../components/common/Search";
import SiteFilter from "../../components/common/SiteFilter";

const Categories = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to home if not an admin or agent
  if (!user?.isAdmin && !user?.isAgent) {
    navigate("/");
  }

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [siteId, setSiteId] = useState(user?.siteAccess.adminOrAgent[0].id);

  const [getCategories, { data, loading }] = useLazyQuery(CATEGORIES_QUERY, {
    onError: (err) => {
      errorMessage(err, "Error loading categories.");
    },
  });

  // Fetch categories when component mounts
  useEffect(() => {
    getCategories({ variables: { first: 500, siteId } });
  }, [siteId, getCategories]);

  // Filter categories based on the search value. This function will run
  // whenever search and data changes
  useEffect(() => {
    // If categories have not been fetched yet, return
    if (!data) return;
    /// Mapping the fetched data to an array of categories as the data from the
    // API is in a form optimized for pagination
    const categories = data?.categories.edges.map(
      (c: { node: Category }) => c.node
    );
    // If search value is empty, all usergroups are shown
    if (search === "") {
      setFiltered(categories);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        categories.filter((category: Category) =>
          category.name.toLowerCase().includes(lower)
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
        <div style={{ display: "flex" }}>
          <SiteFilter
            value={siteId}
            onChange={(value) => {
              setSiteId(value);
            }}
            allowClear={false}
            sites={user?.siteAccess.adminOrAgent}
          />
          <Search
            searchValue={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearch("")}
          />
        </div>
        {user?.isAdmin && (
          <div>
            <AddCategory
              site={user?.siteAccess.adminOrAgent.find(
                (site) => site.id === siteId
              )}
            />
          </div>
        )}
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {filtered.map((category: Category) => (
        <CategoryList category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Categories;
