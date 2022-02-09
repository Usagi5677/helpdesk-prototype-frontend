import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import classes from "./MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewTicket from "../../components/Ticket/NewTicket";
import { useLazyQuery } from "@apollo/client";
import { MY_TICKETS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import TicketModel from "../../models/Ticket";
import { PAGE_LIMIT } from "../../helpers/constants";
import { Spin } from "antd";
import CategorySelector from "../../components/common/CategorySelector";

const MyTickets = () => {
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<{
    search: string;
    first: number;
    categoryIds: number[];
  }>({
    search: "",
    first: PAGE_LIMIT,
    categoryIds: [],
  });

  const [getMyTickets, { data, loading }] = useLazyQuery(MY_TICKETS, {
    onError: (err) => {
      errorMessage(err, "Error loading tickets.");
    },
  });

  // Fetch tickets when component mounts or when the filter object changes
  useEffect(() => {
    getMyTickets({ variables: filter });
  }, [filter]);

  // Debounce the search, meaning the search will only execute 500ms after the
  // last input. This prevents unnecessary API calls.
  useEffect(() => {
    searchDebounced(search);
  }, [search]);
  const searchDebounced = (value: string) => {
    if (timerId) clearTimeout(timerId);
    //@ts-ignore
    setTimerId(setTimeout(() => setFilter({ ...filter, search: value }), 500));
  };

  return (
    <div className={classes["my-tickets-container"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: 5,
              paddingLeft: 10,
            }}
          >
            <FaSearch
              style={{ color: "#ccc", paddingRight: 10, fontSize: 25 }}
            />
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
          <div
            style={{
              display: "flex",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: "1px 5px 1px 5px",
              marginLeft: "1rem",
              alignItems: "center",
            }}
          >
            <CategorySelector
              onChange={(categoryIds) => setFilter({ ...filter, categoryIds })}
            />
          </div>
        </div>
        <div>
          <NewTicket />
        </div>
        {/* <button className={classes["my-tickets-options-wrapper__filter"]}>
          <FaPlus />
          <span>Filter</span>
        </button> */}
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {data?.myTickets.edges.map((rec: { node: TicketModel }) => {
        const ticket = rec.node;
        return (
          <Link to={"/view-ticket/" + ticket.id} key={ticket.id}>
            <Ticket ticket={ticket} />
          </Link>
        );
      })}
    </div>
  );
};

export default MyTickets;
