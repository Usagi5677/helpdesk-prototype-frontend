import classes from "./CreateTicket.module.css";
import { useContext, useState, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import { MyTicketData } from ".././MyTickets/MyTicketsData";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef<any>();
  const [createTicketForm, setCreateTicketForm] = useState({
    name: user.fullName,
    email: user.email,
    contactNumber: "",
    category: "Category",
    title: "",
    description: "",
  });

  //const [myTicketDataState, setMyTicketDataState] = useState(MyTicketData);
  const onClickClearHandler = () => {
    formRef.current.reset();
  };
  const onChangeHandler = (event: any) => {
    const value = event.target.value;
    setCreateTicketForm({
      ...createTicketForm,
      [event.target.name]: value,
    });
  };
  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    MyTicketData.push({
      ticketID: `T${MyTicketData.length + 1}`,
      icon: "./avatar.jpg",
      fullname: `${user.fullName}`,
      email: `${user.email}`,
      contactNumber: `${createTicketForm.contactNumber}`,
      createdDate: "01/01/2022",
      ticketTitle: `${createTicketForm.title}`,
      ticketDescription: `${createTicketForm.description}`,
      category: `${createTicketForm.category}`,
      priority: "Low",
      //group: ["Software"],
      agent: ["Unassigned"],
      started: "01/01/2022",
      status: "open",
    });
    /*
    setMyTicketDataState([...myTicketDataState, {
      ticketID: "T05",
        icon: "./avatar.jpg",
        fullname: "Ibrahimu naishu",
        email: "Naishu@gmail.com",
        createdDate: "01/01/2022",
        ticketTitle: "Change keyboard",
        category: "Problem",
        priority: "Low",
        group: "Software",
        agent: ["Unassigned"],
        started: "01/01/2022",
        status: "pending",
    }]);
    */

    formRef.current.reset();
    navigate("/my-tickets");
  };

  return (
    <form onSubmit={onSubmitHandler} ref={formRef}>
      <div className={classes["create-ticket-container"]}>
        <div className={classes["create-ticket-wrapper"]}>
          <div className={classes["create-ticket-wrapper__title"]}>
            Create Ticket
          </div>

          <div className={classes["create-ticket-wrapper__input-title"]}>
            Title
          </div>
          <div
            className={`${classes["create-ticket-wrapper__input-field"]} ${classes["--ticket-title"]}`}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={onChangeHandler}
            />
          </div>

          <div className={classes["create-ticket-wrapper__input-title"]}>
            Description
          </div>
          <textarea
            className={classes["create-ticket-wrapper__description"]}
            name="description"
            placeholder="Description"
            onChange={onChangeHandler}
          ></textarea>

          <div className={classes["create-ticket-wrapper__button_wrapper"]}>
            <button
              className={classes["create-ticket-wrapper__secondary-button"]}
              onClick={onClickClearHandler}
              type="button"
            >
              Clear
            </button>
            <button
              className={classes["create-ticket-wrapper__primary-button"]}
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTicket;
