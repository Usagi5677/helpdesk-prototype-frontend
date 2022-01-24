import { FaSearch, FaPlus } from "react-icons/fa";
import classes from "./MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { MyTicketData } from "./MyTicketsData";

const MyTickets = () => {
  return (
    <div className={classes["my-tickets-container"]}>
      <div className={classes["my-tickets-options-wrapper"]}>
        <div className={classes["my-tickets-options-wrapper__ticket-amount"]}>
          1 ticket
        </div>
        <div className={classes["my-tickets-options-wrapper__search-wrapper"]}>
          <div
            className={
              classes["my-tickets-options-wrapper__search-wrapper_icon"]
            }
          >
            <FaSearch />
          </div>
          <input type="text" name="" id="" placeholder="Search" />
        </div>

        <button className={classes["my-tickets-options-wrapper__filter"]}>
          <FaPlus />
          <span>Filter</span>
        </button>
      </div>
      {MyTicketData.map((ticketData: any, index: number) => (
        <Ticket
          key={index}
          ticketID={ticketData.ticketID}
          profileIcon={ticketData.icon}
          name={ticketData.fullname}
          email={ticketData.email}
          createdDate={ticketData.createdDate}
          ticketTitle={ticketData.ticketTitle}
          category={ticketData.category}
          priority={ticketData.priority}
          group={ticketData.group}
          agent={ticketData.agent}
          started={ticketData.started}
          status={ticketData.status}
        />
      ))}
    </div>
  );
};

export default MyTickets;
