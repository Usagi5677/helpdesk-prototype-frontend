import "./MyTickets.css";
import { FaGlobe, FaRegEnvelope, FaEllipsisV } from "react-icons/fa";

const MyTickets = () => {
  return (
    <div className="my-tickets-container">
      <div className="my-tickets-options-wrapper"></div>
      <div className="my-tickets-wrapper">
        <div className="my-tickets-wrapper__user-details-container">
          <div className="my-tickets-wrapper__user-details-wrapper">
            <img
              className="my-tickets-wrapper__user-details__icon"
              src="./avatar.jpg"
              alt=""
            />
            <div className="my-tickets-wrapper__user-details__user-info-wrapper">
              <div className="my-tickets-wrapper__user-details__fullname">
                Ibrahimu Naishu
              </div>
              <div className="my-tickets-wrapper__user-details__email-wrapper">
                <div className="my-tickets-wrapper__user-details__email__icon">
                  <FaRegEnvelope />
                </div>
                <div className="my-tickets-wrapper__user-details__email__text">
                  Naishu@gmail.com
                </div>
              </div>
              <div className="my-tickets-wrapper__user-details__created-date-wrapper">
                <div className="my-tickets-wrapper__user-details__created-date__icon">
                  <FaGlobe />
                </div>
                <div className="my-tickets-wrapper__user-details__created-date__date">
                  Created at 01/01/2022
                </div>
              </div>
            </div>
          </div>
          <div className="my-tickets-wrapper__divider"></div>
          <div className="my-tickets-wrapper__ticket-details-wrapper">
            <div className="my-tickets-wrapper__ticket-details__title">
              T01 - change password
            </div>
            <div className="my-tickets-wrapper__ticket-details__info-container">
              <div className="my-tickets-wrapper__ticket-details__info-wrapper">
                <div className="my-tickets-wrapper__ticket-details__category-wrapper">
                  <div className="my-tickets-wrapper__ticket-details__category-title">
                    Category
                  </div>
                  <div className="my-tickets-wrapper__ticket-details__category-type">
                    problem
                  </div>
                </div>
                <div className="my-tickets-wrapper__ticket-details__priority-wrapper">
                  <div className="my-tickets-wrapper__ticket-details__priority-title">
                    Priority
                  </div>
                  <div className="my-tickets-wrapper__ticket-details__priority-type">
                    Medium
                  </div>
                </div>
              </div>
              <div className="my-tickets-wrapper__ticket-details__info-wrapper">
                <div className="my-tickets-wrapper__ticket-details__group-wrapper">
                  <div className="my-tickets-wrapper__ticket-details__group-title">
                    Group
                  </div>
                  <div className="my-tickets-wrapper__ticket-details__group-name">
                    Software
                  </div>
                </div>
                <div className="my-tickets-wrapper__ticket-details__agent-wrapper">
                  <div className="my-tickets-wrapper__ticket-details__agent-title">
                    Agent
                  </div>
                  <div className="my-tickets-wrapper__ticket-details__agent-name">
                    Unassigned
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-tickets-wrapper__ticket-activity-wrapper">
            <div className="my-tickets-wrapper__ticket-activity__started-wrapper">
              <div className="my-tickets-wrapper__ticket-activity__started">
                Started:
                <span className="my-tickets-wrapper__ticket-activity__started-date">
                  11/11/2021
                </span>
              </div>
              <div className="my-tickets-wrapper__ticket-activity__status">
                open
              </div>
            </div>
          </div>
        </div>
        <div className="my-tickets-wrapper__icon-wrapper">
          <FaEllipsisV />
        </div>
      </div>
      
    </div>
  );
};

export default MyTickets;
