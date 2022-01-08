import { FaChevronDown, FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import classes from "./ViewTicket.module.css";

const options = [
  { value: "0", label: "Unassigned" },
  { value: "1", label: "Software" },
  { value: "2", label: "Group A" },
  { value: "3", label: "Group B" },
  { value: "4", label: "Group C" },
];
const options2 = [
  { value: "0", label: "Unassigned" },
  { value: "1", label: "Person 1" },
  { value: "2", label: "Person 2" },
  { value: "3", label: "Person 3" },
  { value: "4", label: "Person 4" },
];
const animatedComponents = makeAnimated();

const ViewTicket = () => {
  return (
    <div className={classes['view-ticket-container']}>
      <div className={classes['view-ticket-container__view-ticket-wrapper']}>
        <div className={classes['view-ticket-wrapper__header']}>
          <button className={classes['view-ticket-wrapper__back-btn']}>
            <FaArrowLeft /> <span>Back</span>
          </button>
          <div className={classes['view-ticket-wrapper__title']}>
            T01 - Change password
          </div>
          <div className={classes['view-ticket-wrapper__spacer']}></div>
        </div>
        <div className={classes['view-ticket-wrapper__tab-wrapper']}>
          <div className={classes['view-ticket-wrapper__tab-wrapper_tab']}>
            Conversation
          </div>
          <div className={classes['view-ticket-wrapper__tab-wrapper_tab']}>
            Attachment
          </div>
        </div>
      </div>
      <div className={classes['view-ticket-container__view-ticket-details-wrapper']}>
        <div className={classes['view-ticket-container__view-ticket-history-wrapper']}>
          <div className={classes['view-ticket-history-wrapper__title']}>
            Ticket History
          </div>
          <ul className={classes['view-ticket-history-wrapper__time-line-wrapper']}>
            <li>
              <div className={classes['view-ticket-history-wrapper__time']}>
                1st January 2021 <span>&#9679;</span> 22:00
              </div>
              <p>You replied to your ticket.</p>
            </li>
            <li>
              <div className={classes['view-ticket-history-wrapper__time']}>
                1st January 2021 <span>&#9679;</span> 22:00
              </div>
              <p>You replied to your ticket.</p>
            </li>
            <li>
              <div className={classes['view-ticket-history-wrapper__time']}>
                1st January 2021 <span>&#9679;</span> 22:00
              </div>
              <p>You replied to your ticket.</p>
            </li>
            <li>
              <div className={classes['view-ticket-history-wrapper__time']}>
                1st January 2021 <span>&#9679;</span> 22:00
              </div>
              <p>You replied to your ticket.</p>
            </li>
            <li>
              <div className={classes['view-ticket-history-wrapper__time']}>
                1st January 2021 <span>&#9679;</span> 22:00
              </div>
              <p>You replied to your ticket.</p>
            </li>
          </ul>
        </div>
        <div className={classes['view-ticket-container__view-ticket-information-wrapper']}>
          <div className={classes['view-ticket-information-wrapper__title']}>
            Ticket Information
          </div>
          <div className={classes['view-ticket-information-wrapper__ticket-id']}>
            Ticket ID: <span>T01</span>
          </div>
          <div className={classes['view-ticket-information-wrapper__priority-wrapper']}>
            <div className={classes['view-ticket-information-wrapper__priority-wrapper__title']}>
              Priority:
            </div>
            <div className={classes['view-ticket-information-wrapper__priority-wrapper__select-wrapper']}>
              <select name="" id="">
                <option value="0">Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
              </select>
              <div className={classes['view-ticket-information-wrapper__select-wrapper__icon']}>
                <FaChevronDown />
              </div>
            </div>
          </div>
          <div className={classes['view-ticket-information-wrapper__rating']}>
            Rating: <span>Not Rated</span>
          </div>
          <div className={classes['view-ticket-information-wrapper__created-date']}>
            Created date: <span>01/01/2022</span>
          </div>
          <div className={classes['view-ticket-information-wrapper__last-msg']}>
            Last message: <span>01/01/2022</span>
          </div>
          <div className={classes['view-ticket-information-wrapper__group-wrapper']}>
            <div className={classes['view-ticket-information-wrapper__group-wrapper__title']}>
              Group:
            </div>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
            />
          </div>
          <div className={classes['view-ticket-information-wrapper__assign-wrapper']}>
            <div className={classes['view-ticket-information-wrapper__assign-wrapper__title']}>
              Agent:
            </div>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
