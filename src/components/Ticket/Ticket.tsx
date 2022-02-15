import { FaGlobe, FaRegEnvelope } from "react-icons/fa";
import classes from "./Ticket.module.css";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import Ticket from "../../models/Ticket";
import moment from "moment";
import { Avatar, Progress, Tag, Tooltip } from "antd";
import { stringToColor } from "../../helpers/style";
import StatusTag from "../common/StatusTag";

const Tickets = ({ ticket }: { ticket: Ticket }) => {
  const progressPercentage = Math.round(
    (ticket?.checklistItems.filter((item) => item.completedAt !== null).length /
      ticket?.checklistItems.length) *
      100
  );

  return (
    <div className={classes["my-tickets-wrapper"]}>
      <div className={classes["my-tickets-wrapper__user-details-container"]}>
        <div className={classes["my-tickets-wrapper__user-details-wrapper"]}>
          <DefaultAvatar
            fullname={ticket.createdBy.fullName}
            userAvatarWidth={"36px"}
            userAvatarHeight={"36px"}
            showAgentList={false}
          />
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className={classes["my-tickets-wrapper__ticket-details__title"]}
            >
              {ticket.id} - {ticket.title}
            </div>
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
                {ticket?.agents.length > 0 && (
                  <Avatar.Group
                    maxCount={5}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {ticket?.agents.map((agent) => {
                      return (
                        <Tooltip
                          title={
                            <>
                              {ticket?.ownerId === agent.id && (
                                <div style={{ opacity: 0.5 }}>Ticket Owner</div>
                              )}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {agent.fullName} ({agent.rcno})
                              </div>
                            </>
                          }
                          placement="bottom"
                          key={agent.id}
                        >
                          <Avatar
                            style={{
                              backgroundColor: stringToColor(agent.fullName),
                            }}
                          >
                            {agent.fullName
                              .match(/^\w|\b\w(?=\S+$)/g)
                              ?.join()
                              .replace(",", "")
                              .toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      );
                    })}
                  </Avatar.Group>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ minWidth: 100 }}>
          <div
            className={
              classes["my-tickets-wrapper__ticket-activity__started-wrapper"]
            }
          >
            {ticket?.checklistItems.length > 0 && (
              <Progress
                // style={{ marginLeft: 20 }}
                percent={progressPercentage}
                size="small"
              />
            )}

            <StatusTag status={ticket.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
