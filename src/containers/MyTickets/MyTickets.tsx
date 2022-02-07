import { FaSearch, FaPlus } from "react-icons/fa";
import classes from "./MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { MyTicketData } from "./MyTicketsData";
import { Link } from "react-router-dom";

const MyTickets = () => {
  return (
    <div className={classes["my-tickets-container"]}>
      <div className={classes["my-tickets-options-wrapper"]}>
        <div className={classes["my-tickets-options-wrapper__ticket-amount"]}>1 ticket</div>
        <div className={classes["my-tickets-options-wrapper__search-wrapper"]}>
          <div className={classes["my-tickets-options-wrapper__search-wrapper_icon"]}>
            <FaSearch />
          </div>
          <input type="text" name="" id="" placeholder="Search" />
        </div>

        <button className={classes["my-tickets-options-wrapper__filter"]}>
          <FaPlus />
          <span>Filter</span>
        </button>
      </div>
      {MyTicketData.map((ticketData: any, index: number) => {
        return (
          <Link to={'/view-ticket/'+ticketData.ticketID} key={ticketData.ticketID}>
            <Ticket
              ticketData={ticketData}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MyTickets;
