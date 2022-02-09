import { FaGlobe, FaRegEnvelope, FaEllipsisV } from "react-icons/fa";
import classes from "./Ticket.module.css";
import StatusTag from ".././UI/StatusTag/StatusTag";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import Ticket from "../../models/Ticket";
import moment from "moment";
import User from "../../models/User";
import { Tag } from "antd";
import { stringToColor } from "../../helpers/style";

const Tickets = ({ ticket }: { ticket: Ticket }) => {
  let statusTag;
  switch (ticket.status) {
    case "Open":
      statusTag = (
        <StatusTag
          name={ticket.status}
          bgColor={"rgba(0, 183, 255, 0.2)"}
          fontColor={"rgb(0, 115, 161)"}
          bgHover={"rgb(0, 183, 255)"}
          fontHover={"white"}
        />
      );
      break;
    case "Pending":
      statusTag = (
        <StatusTag
          name={ticket.status}
          bgColor={"rgba(247, 173, 3, 0.2)"}
          fontColor={"rgb(145, 101, 0)"}
          bgHover={"rgb(247, 173, 3)"}
          fontHover={"white"}
        />
      );
      break;
    case "Solved":
      statusTag = (
        <StatusTag
          name={ticket.status}
          bgColor={"rgba(83, 233, 0, 0.2)"}
          fontColor={"rgb(61, 163, 2)"}
          bgHover={"rgb(83, 233, 0)"}
          fontHover={"white"}
        />
      );
      break;
    case "Closed":
      statusTag = (
        <StatusTag
          name={ticket.status}
          bgColor={"rgba(140, 146, 149, 0.2)"}
          fontColor={"rgb(97, 100, 102)"}
          bgHover={"rgb(140, 146, 149)"}
          fontHover={"white"}
        />
      );
      break;
    case "Reopened":
      statusTag = (
        <StatusTag
          name={ticket.status}
          bgColor={"rgba(0, 241, 255, 0.2)"}
          fontColor={"rgb(0, 160, 161)"}
          bgHover={"rgb(0, 183, 255)"}
          fontHover={"white"}
        />
      );
      break;
    default:
      statusTag = (
        <StatusTag
          name="Unassigned"
          bgColor={"rgba(0, 183, 255, 0.2)"}
          fontColor={"rgb(0, 115, 161)"}
          bgHover={"rgb(0, 183, 255)"}
          fontHover={"white"}
        />
      );
      break;
  }

  let moreThanThreeAssign: any;
  if (ticket.agents.length > 2) {
    moreThanThreeAssign = ticket.agents.slice(3, ticket.agents.length);
  }

  return (
    <div className={classes["my-tickets-wrapper"]}>
      <div className={classes["my-tickets-wrapper__user-details-container"]}>
        <div className={classes["my-tickets-wrapper__user-details-wrapper"]}>
          {/* {ticket.profileIcon ? (
            <DefaultAvatar
              userAvatar={ticket.profileIcon}
              userAvatarWidth={"42px"}
              userAvatarHeight={"42px"}
              showAgentList={false}
            />
          ) : ( */}
          <DefaultAvatar
            fullname={ticket.createdBy.fullName}
            userAvatarWidth={"36px"}
            userAvatarHeight={"36px"}
            showAgentList={false}
          />
          {/* )} */}

          <div
            className={
              classes["my-tickets-wrapper__user-details__user-info-wrapper"]
            }
          >
            <div
              className={classes["my-tickets-wrapper__user-details__fullname"]}
            >
              {ticket.createdBy.fullName}
            </div>
            <div
              className={
                classes["my-tickets-wrapper__user-details__email-wrapper"]
              }
            >
              <div
                className={
                  classes["my-tickets-wrapper__user-details__email__icon"]
                }
              >
                <FaRegEnvelope />
              </div>
              <div
                className={
                  classes["my-tickets-wrapper__user-details__email__text"]
                }
              >
                {ticket.createdBy.email}
              </div>
            </div>
            <div
              className={
                classes[
                  "my-tickets-wrapper__user-details__created-date-wrapper"
                ]
              }
            >
              <div
                className={
                  classes[
                    "my-tickets-wrapper__user-details__created-date__icon"
                  ]
                }
              >
                <FaGlobe />
              </div>
              <div
                className={
                  classes[
                    "my-tickets-wrapper__user-details__created-date__date"
                  ]
                }
              >
                {moment(ticket.createdAt).format("DD MMMM YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className={classes["my-tickets-wrapper__divider"]}></div>
        <div className={classes["my-tickets-wrapper__ticket-details-wrapper"]}>
          <div className={classes["my-tickets-wrapper__ticket-details__title"]}>
            {ticket.id} - {ticket.title}
          </div>
          <div
            className={
              classes["my-tickets-wrapper__ticket-details__info-container"]
            }
          >
            <div
              className={
                classes["my-tickets-wrapper__ticket-details__info-wrapper"]
              }
            >
              <div
                className={
                  classes[
                    "my-tickets-wrapper__ticket-details__category-wrapper"
                  ]
                }
              >
                <div
                  className={
                    classes[
                      "my-tickets-wrapper__ticket-details__category-title"
                    ]
                  }
                >
                  Categories
                </div>
                <div
                  className={
                    classes["my-tickets-wrapper__ticket-details__category-type"]
                  }
                >
                  {/* {ticket.categories.map((c) => c.name).join(", ")} */}
                  {ticket.categories.map((category) => (
                    <Tag
                      style={{ padding: "0px 4px 0px 4px" }}
                      key={category.id}
                      color={stringToColor(category.name)}
                    >
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>
              <div
                className={
                  classes[
                    "my-tickets-wrapper__ticket-details__priority-wrapper"
                  ]
                }
              >
                <div
                  className={
                    classes[
                      "my-tickets-wrapper__ticket-details__priority-title"
                    ]
                  }
                >
                  Priority
                </div>
                <div
                  className={
                    classes["my-tickets-wrapper__ticket-details__priority-type"]
                  }
                >
                  {ticket.priority}
                </div>
              </div>
            </div>
            <div
              className={
                classes["my-tickets-wrapper__ticket-details__info-wrapper"]
              }
            >
              <div
                className={
                  classes["my-tickets-wrapper__ticket-details__agent-wrapper"]
                }
              >
                <div
                  className={
                    classes["my-tickets-wrapper__ticket-details__agent-title"]
                  }
                >
                  Agents
                </div>
                {ticket.agents.length > 1 ? (
                  <div
                    className={
                      classes[
                        "my-tickets-wrapper__ticket-details__agent-name-circle-wrapper"
                      ]
                    }
                  >
                    {ticket.agents.map((agent: User, index: number) => {
                      if (index === 3) {
                        return (
                          <DefaultAvatar
                            key={agent.id}
                            fullname={agent.fullName}
                            moreThan={moreThanThreeAssign}
                            ticketID={ticket.id}
                            showAgentList={true}
                          />
                        );
                      } else if (index >= 0 && index < 3) {
                        return (
                          <DefaultAvatar
                            key={agent.id}
                            fullname={agent.fullName}
                            agentList={agent.fullName}
                            showAgentList={true}
                          />
                        );
                      } else return null;
                    })}
                  </div>
                ) : ticket.agents.length === 1 ? (
                  <div
                    className={
                      classes["my-tickets-wrapper__ticket-details__agent-name"]
                    }
                  >
                    {ticket.agents[0].fullName}
                  </div>
                ) : (
                  <div
                    className={
                      classes["my-tickets-wrapper__ticket-details__agent-name"]
                    }
                  >
                    Unassigned
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes["my-tickets-wrapper__ticket-activity-wrapper"]}>
          <div
            className={
              classes["my-tickets-wrapper__ticket-activity__started-wrapper"]
            }
          >
            <div
              className={
                classes["my-tickets-wrapper__ticket-activity__started"]
              }
            >
              Started:
              <span
                className={
                  classes["my-tickets-wrapper__ticket-activity__started-date"]
                }
              >
                {ticket.started}
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
