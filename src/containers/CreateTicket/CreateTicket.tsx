import { FaChevronDown } from "react-icons/fa";
import "./CreateTicket.css";

const CreateTicket = () => {
  return (
    <div className="create-ticket-container">
      <div className="create-ticket-wrapper">
        <div className="create-ticket-wrapper__title">Create Ticket</div>
        <div className="create-ticket-wrapper__info">
          <div className="create-ticket-wrapper__input-field --name">
            <input
              type="text"
              name=""
              id=""
              placeholder="Name"
              value={"Ibrahimu Naishu"}
            />
          </div>
          <div className="create-ticket-wrapper__input-field --email">
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              value={"Naishu@gmail.com"}
            />
          </div>
          <div className="create-ticket-wrapper__input-field --mobile-number">
            <input
              type="text"
              name=""
              id=""
              placeholder="Contact Number"
              value={"7654321"}
            />
          </div>
          <div className="create-ticket-wrapper__select-field --category">
            <select name="" id="" placeholder="Category">
              <option value="0">Category</option>
              <option value="1">Problem</option>
            </select>
            <div className="create-ticket-wrapper__select-field__icon">
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className="create-ticket-wrapper__ticket-info">
          <div className="create-ticket-wrapper__input-field --ticket-title">
            <input type="text" name="" id="" placeholder="Title" />
          </div>
          <div className="create-ticket-wrapper__file-input">
            <input type="file" id="myfile" name="myfile"></input>
          </div>
        </div>

        <div className="create-ticket-wrapper__description-field">
          <textarea name="" id="" placeholder="Description"></textarea>
        </div>
        <div className="create-ticket-wrapper__button_wrapper">
          <button className="create-ticket-wrapper__secondary-button">
            Clear
          </button>
          <button className="create-ticket-wrapper__primary-button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
