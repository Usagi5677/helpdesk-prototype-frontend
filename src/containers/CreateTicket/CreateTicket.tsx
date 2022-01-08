import { FaChevronDown } from "react-icons/fa";
import classes from "./CreateTicket.module.css";

const CreateTicket = () => {
  return (
    <div className={classes['create-ticket-container']}>
      <div className={classes['create-ticket-wrapper']}>
        <div className={classes['create-ticket-wrapper__title']}>Create Ticket</div>
        <div className={classes['create-ticket-wrapper__info']}>
          <div className={classes['create-ticket-wrapper__input-field']}>
            <input type="text" name="" id="" placeholder="Name" />
          </div>
          <div className={classes['create-ticket-wrapper__input-field']}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              value={"Naishu@gmail.com"}
            />
          </div>
          <div className={classes['create-ticket-wrapper__input-field']}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Contact Number"
              value={"7654321"}
            />
          </div>
          <div className={classes['create-ticket-wrapper__select-field']}>
            <select name="" id="" placeholder="Category">
              <option value="0">Category</option>
              <option value="1">Problem</option>
            </select>
            <div className={classes['create-ticket-wrapper__select-field__icon']}>
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className={classes['create-ticket-wrapper__ticket-info']}>
          <div className={`${classes['create-ticket-wrapper__input-field']} ${classes['--ticket-title']}`}>
            <input type="text" name="" id="" placeholder="Title" />
          </div>
          <div className={classes['create-ticket-wrapper__file-input']}>
            <input type="file" id="myfile" name="myfile"></input>
          </div>
        </div>

        <textarea
          className={classes['create-ticket-wrapper__description']}
          name=""
          id=""
          placeholder="Description"
        ></textarea>

        <div className={classes['create-ticket-wrapper__button_wrapper']}>
          <button className={classes['create-ticket-wrapper__secondary-button']}>
            Clear
          </button>
          <button className={classes['create-ticket-wrapper__primary-button']}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
