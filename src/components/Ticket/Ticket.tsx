import { FaRegClock } from "react-icons/fa";
import classes from "./Ticket.module.css";
import DefaultAvatar from ".././UI/DefaultAvatar/DefaultAvatar";
import Ticket from "../../models/Ticket";
import moment from "moment";
import { Avatar, Progress, Tag, Tooltip } from "antd";
import { stringToColor } from "../../helpers/style";
import StatusTag from "../common/StatusTag";
import PriorityTag from "../common/PriorityTag";
import RatingStars from "./RatingStars";
import UserAvatar from "../common/UserAvatar";

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
              {ticket.createdBy.fullName} ({ticket.createdBy.rcno})
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
                <FaRegClock />
              </div>
              <div
                className={
                  classes[
                    "my-tickets-wrapper__user-details__created-date__date"
                  ]
                }
              >
                {moment(ticket.createdAt).format("DD MMMM YYYY HH:mm:ss")}
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
                  <PriorityTag priority={ticket.priority} />
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
                          <UserAvatar user={agent} />
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
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {ticket?.checklistItems.length > 0 && (
              <Progress percent={progressPercentage} size="small" />
            )}
            <div style={{ paddingRight: 24 }}>
              <StatusTag status={ticket?.status} />
            </div>
            {ticket?.rating && (
              <div style={{ paddingRight: 24 }}>
                <RatingStars rating={ticket?.rating} fontSize={15} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
