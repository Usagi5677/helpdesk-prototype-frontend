import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import classes from "./MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { MyTicketData } from "./MyTicketsData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewTicket from "../../components/Ticket/NewTicket";
import { useLazyQuery } from "@apollo/client";
import { MY_TICKETS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import TicketModel from "../../models/Ticket";

const MyTickets = () => {
  const [search, setSearch] = useState("");

  const [getMyTickets, { data, loading }] = useLazyQuery(MY_TICKETS, {
    onError: (err) => {
      errorMessage(err, "Error loading tickets.");
    },
  });

  // Fetch categories when component mounts
  useEffect(() => {
    getMyTickets({ variables: { first: 500 } });
  }, []);

  return (
    <div className={classes["my-tickets-container"]}>
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
          <NewTicket />
        </div>
        {/* <button className={classes["my-tickets-options-wrapper__filter"]}>
          <FaPlus />
          <span>Filter</span>
        </button> */}
      </div>
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
