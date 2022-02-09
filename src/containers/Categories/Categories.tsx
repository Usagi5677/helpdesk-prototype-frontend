import { FaSearch, FaTimes } from "react-icons/fa";
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

const Categories = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to home if not an admin or agent
  if (!user?.isAdmin && !user?.isAgent) {
    navigate("/");
  }

  const [search, setSearch] = useState("");
  const [filered, setFiltered] = useState<Category[]>([]);
  const [getCategories, { data, loading }] = useLazyQuery(CATEGORIES_QUERY, {
    onError: (err) => {
      errorMessage(err, "Error loading categories.");
    },
  });

  // Fetch categories when component mounts
  useEffect(() => {
    getCategories({ variables: { first: 500 } });
  }, []);

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
            <AddCategory />
          </div>
        )}
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {filered.map((category: Category) => (
        <CategoryList category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Categories;
