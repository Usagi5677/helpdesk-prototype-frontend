import { FaGlobe, FaRegEnvelope, FaEllipsisV, FaPlus } from "react-icons/fa";
import classes from "./Ticket.module.css";
import StatusTag from ".././UI/StatusTag/StatusTag";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";

const Tickets = (props: any) => {
  let statusTag;
  switch (props.status) {
    case "open":
      statusTag = (
        <StatusTag
          name={props.status}
          bgColor={"rgba(0, 183, 255, 0.2)"}
          fontColor={"rgb(0, 115, 161)"}
          bgHover={"rgb(0, 183, 255)"}
          fontHover={"white"}
        />
      );
      break;
    case "pending":
      statusTag = (
        <StatusTag
          name={props.status}
          bgColor={"rgba(247, 173, 3, 0.2)"}
          fontColor={"rgb(145, 101, 0)"}
          bgHover={"rgb(247, 173, 3)"}
          fontHover={"white"}
        />
      );
      break;
    case "solved":
      statusTag = (
        <StatusTag
          name={props.status}
          bgColor={"rgba(83, 233, 0, 0.2)"}
          fontColor={"rgb(61, 163, 2)"}
          bgHover={"rgb(83, 233, 0)"}
          fontHover={"white"}
        />
      );
      break;
    case "closed":
      statusTag = (
        <StatusTag
          name={props.status}
          bgColor={"rgba(140, 146, 149, 0.2)"}
          fontColor={"rgb(97, 100, 102)"}
          bgHover={"rgb(140, 146, 149)"}
          fontHover={"white"}
        />
      );
      break;
    case "unassigned":
      statusTag = (
        <StatusTag
          name={props.status}
          bgColor={"rgba(0, 183, 255, 0.2)"}
          fontColor={"rgb(0, 115, 161)"}
          bgHover={"rgb(0, 183, 255)"}
          fontHover={"white"}
        />
      );
      break;
    default:
      break;
  }

  let moreThanThreeAssign = props.agent.slice(2, props.agent.length - 1);

  return (
    <div className={classes["my-tickets-wrapper"]}>
      <div className={classes["my-tickets-wrapper__user-details-container"]}>
        <div className={classes["my-tickets-wrapper__user-details-wrapper"]}>
          <DefaultAvatar userAvatar={props.profileIcon} userAvatarWidth={"42px"} userAvatarHeight={"42px"}/>
          <div className={classes["my-tickets-wrapper__user-details__user-info-wrapper"]}>
            <div className={classes["my-tickets-wrapper__user-details__fullname"]}>
              {props.name}
            </div>
            <div className={classes["my-tickets-wrapper__user-details__email-wrapper"]}>
              <div className={classes["my-tickets-wrapper__user-details__email__icon"]}>
                <FaRegEnvelope />
              </div>
              <div className={classes["my-tickets-wrapper__user-details__email__text"]}>
                {props.email}
              </div>
            </div>
            <div className={classes["my-tickets-wrapper__user-details__created-date-wrapper"]}>
              <div className={classes["my-tickets-wrapper__user-details__created-date__icon"]}>
                <FaGlobe />
              </div>
              <div className={classes["my-tickets-wrapper__user-details__created-date__date"]}>
                {props.createdDate}
              </div>
            </div>
          </div>
        </div>
        <div className={classes["my-tickets-wrapper__divider"]}></div>
        <div className={classes["my-tickets-wrapper__ticket-details-wrapper"]}>
          <div className={classes["my-tickets-wrapper__ticket-details__title"]}>
            {props.ticketID} - {props.ticketTitle}
          </div>
          <div className={classes["my-tickets-wrapper__ticket-details__info-container"]}>
            <div className={classes["my-tickets-wrapper__ticket-details__info-wrapper"]}>
              <div className={classes["my-tickets-wrapper__ticket-details__category-wrapper"]}>
                <div className={classes["my-tickets-wrapper__ticket-details__category-title"]}>
                  Category
                </div>
                <div className={classes["my-tickets-wrapper__ticket-details__category-type"]}>
                  {props.category}
                </div>
              </div>
              <div className={classes["my-tickets-wrapper__ticket-details__priority-wrapper"]}>
                <div className={classes["my-tickets-wrapper__ticket-details__priority-title"]}>
                  Priority
                </div>
                <div className={classes["my-tickets-wrapper__ticket-details__priority-type"]}>
                  {props.priority}
                </div>
              </div>
            </div>
            <div className={classes["my-tickets-wrapper__ticket-details__info-wrapper"]}>
              <div className={classes["my-tickets-wrapper__ticket-details__group-wrapper"]}>
                <div className={classes["my-tickets-wrapper__ticket-details__group-title"]}>
                  Group
                </div>
                <div className={classes["my-tickets-wrapper__ticket-details__group-name"]}>
                  {props.group}
                </div>
              </div>
              <div className={classes["my-tickets-wrapper__ticket-details__agent-wrapper"]}>
                <div className={classes["my-tickets-wrapper__ticket-details__agent-title"]}>
                  Agent
                </div>
                {props.agent && props.agent.length > 1 ? (
                  <div
                    className={
                      classes["my-tickets-wrapper__ticket-details__agent-name-circle-wrapper"]
                    }
                  >
                    {props.agent.map((agentValue: any, index: number) => {
                      if (index === 3) {
                        return (
                          <DefaultAvatar
                            key={props.ticketID + index}
                            name={agentValue}
                            moreThanThree={moreThanThreeAssign}
                            ticketID={props.ticketID}
                          />
                        );
                      } else if (index >= 0 && index < 3) {
                        return (
                          <DefaultAvatar
                            key={props.ticketID + index}
                            name={agentValue}
                            agentList={agentValue}
                          />
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div className={classes["my-tickets-wrapper__ticket-details__agent-name"]}>
                    {props.agent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes["my-tickets-wrapper__ticket-activity-wrapper"]}>
          <div className={classes["my-tickets-wrapper__ticket-activity__started-wrapper"]}>
            <div className={classes["my-tickets-wrapper__ticket-activity__started"]}>
              Started:
              <span className={classes["my-tickets-wrapper__ticket-activity__started-date"]}>
                {props.started}
              </span>
            </div>
            {statusTag}
          </div>
        </div>
      </div>
      <div className={classes["my-tickets-wrapper__icon-wrapper"]}>
        <FaEllipsisV />
      </div>
    </div>
  );
};

export default Tickets;
