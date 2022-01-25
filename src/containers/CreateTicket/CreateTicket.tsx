import { FaChevronDown } from "react-icons/fa";
import classes from "./CreateTicket.module.css";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { MyTicketData } from ".././MyTickets/MyTicketsData";

const CreateTicket = () => {
  const { user } = useContext(UserContext);

  const [createTicketForm, setCreateTicketForm] = useState({
    name: user.fullName,
    email: user.email,
    contactNumber: "",
    category: "Category",
    title: "",
    description: "",
  });

  //const [myTicketDataState, setMyTicketDataState] = useState(MyTicketData);

  function onChangeHandler(event: any) {
    const value = event.target.value;
    setCreateTicketForm({
      ...createTicketForm,
      [event.target.name]: value,
    });
  }
  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    MyTicketData.push({
      ticketID: "T" + `${MyTicketData.length + 1}`,
      icon: "./avatar.jpg",
      fullname: `${createTicketForm.name}`,
      email: `${createTicketForm.email}`,
      contactNumber: `${createTicketForm.contactNumber}`,
      createdDate: "01/01/2022",
      ticketTitle: `${createTicketForm.title}`,
      ticketDescription: `${createTicketForm.description}`,
      category: `${createTicketForm.category}`,
      priority: "Low",
      group: "Software",
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

    (document.getElementById("create-ticket-form") as HTMLFormElement).reset();
    console.log(MyTicketData);
  };
  console.log(MyTicketData);
  return (
    <form onSubmit={onSubmitHandler} id="create-ticket-form">
      <div className={classes["create-ticket-container"]}>
        <div className={classes["create-ticket-wrapper"]}>
          <div className={classes["create-ticket-wrapper__title"]}>
            Create Ticket
          </div>
          <div className={classes["create-ticket-wrapper__info"]}>
            <div className={classes["create-ticket-wrapper__input-field"]}>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Name"
                value={createTicketForm.name}
                onChange={onChangeHandler}
              />
            </div>
            <div className={classes["create-ticket-wrapper__input-field"]}>
              <input
                type="text"
                name="email"
                id=""
                placeholder="Email"
                value={createTicketForm.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className={classes["create-ticket-wrapper__input-field"]}>
              <input
                type="text"
                name="contactNumber"
                id=""
                placeholder="Contact Number"
                value={createTicketForm.contactNumber}
                onChange={onChangeHandler}
              />
            </div>
            <div className={classes["create-ticket-wrapper__select-field"]}>
              <select
                name="category"
                id=""
                value={createTicketForm.category}
                onChange={onChangeHandler}
              >
                <option value="Category">Category</option>
                <option value="Problem">Problem</option>
              </select>
              <div
                className={classes["create-ticket-wrapper__select-field__icon"]}
              >
                <FaChevronDown />
              </div>
            </div>
          </div>
          <div className={classes["create-ticket-wrapper__ticket-info"]}>
            <div
              className={`${classes["create-ticket-wrapper__input-field"]} ${classes["--ticket-title"]}`}
            >
              <input
                type="text"
                name="title"
                id=""
                placeholder="Title"
                value={createTicketForm.title}
                onChange={onChangeHandler}
              />
            </div>
            <div className={classes["create-ticket-wrapper__file-input"]}>
              <input type="file" id="myfile" name="myfile"></input>
            </div>
          </div>

          <textarea
            className={classes["create-ticket-wrapper__description"]}
            name="description"
            id=""
            placeholder="Description"
            value={createTicketForm.description}
            onChange={onChangeHandler}
          ></textarea>

          <div className={classes["create-ticket-wrapper__button_wrapper"]}>
            <button
              className={classes["create-ticket-wrapper__secondary-button"]}
            >
              Clear
            </button>
            <button
              className={classes["create-ticket-wrapper__primary-button"]}
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
