import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";
import { useContext, useEffect, useState } from "react";
import { Select, Avatar, Modal, Tooltip, Tag, message } from "antd";
import { avatarColor } from "../../helpers/avatarColor";
import { stringToColor } from "../../helpers/style";
import UserContext from "../../contexts/UserContext";
import { useLazyQuery, useMutation } from "@apollo/client";
import { HAS_TICKET_ACCESS, TICKET } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import moment from "moment";
import { Priority } from "../../models/Enums";
import CategorySelector from "../../components/common/CategorySelector";
import CategoryAdder from "../../components/common/CategoryAdder";
import { REMOVE_TICKET_CATEGORY } from "../../api/mutations";

/*
  List used for assigning agent
*/
const agentList = [
  { id: "U1", name: "Ibrahim Naish1" },
  { id: "U2", name: "Ibrahim Naish2" },
  { id: "U3", name: "Ibrahim Naish3" },
  { id: "U4", name: "Ibrahim Naish4" },
  { id: "U5", name: "Ibrahim Naish5" },
];

/*
  List used for assigning categories
*/
const categoryList = [
  { id: "C1", name: "ProblemOne" },
  { id: "C2", name: "ProblemTwo" },
  { id: "C3", name: "ProblemThree" },
  { id: "C4", name: "ProblemFour" },
  { id: "C5", name: "ProblemFive" },
];

const ViewTicket = () => {
  const { id }: any = useParams();
  const { user } = useContext(UserContext);

  const [hasAccess, { data: access, loading: loadingAccess }] = useLazyQuery(
    HAS_TICKET_ACCESS,
    {
      onCompleted: (data) => {
        if (data.hasTicketAccess === true) {
          getTicket({ variables: { ticketId: parseInt(id) } });
        }
      },
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
    }
  );

  const [getTicket, { data: ticket, loading: loadingTicket }] = useLazyQuery(
    TICKET,
    {
      onError: (err) => {
        errorMessage(err, "Error loading request.");
      },
    }
  );

  const [removeTicketCategory, { loading: loadingRemoveTicketCategory }] =
    useMutation(REMOVE_TICKET_CATEGORY, {
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing category.");
      },
      refetchQueries: ["ticket"],
    });

  useEffect(() => {
    hasAccess({ variables: { ticketId: parseInt(id) } });
  }, []);

  const [prioritySelected, setPrioritySelected] = useState("Choose Priority");

  const ticketData: Ticket = ticket?.ticket;

  useEffect(() => {
    //let groupID: any = ticketData?.group?.[1]?.id;
    //let groupLength: any = ticketData?.group?.length;
  }, []);

  // const onChangeSelectPriorityHandler = (id: any) => {
  //   setPrioritySelected(id);
  //   ticketData?.priority = id;
  // };

  return (
    <>
      <div className={classes["view-ticket-container"]}>
        <div className={classes["view-ticket-container__view-ticket-wrapper"]}>
          <div className={classes["view-ticket-wrapper__header"]}>
            <button className={classes["view-ticket-wrapper__back-btn"]}>
              <FaArrowLeft /> <span>Back</span>
            </button>
            <div className={classes["view-ticket-wrapper__title"]}>
              {ticketData?.title}
            </div>
            <div className={classes["view-ticket-wrapper__spacer"]}></div>
          </div>
          <div className={classes["view-ticket-wrapper__tab-wrapper"]}>
            <div className={classes["view-ticket-wrapper__tab-wrapper_tab"]}>
              Conversation
            </div>
            <div className={classes["view-ticket-wrapper__tab-wrapper_tab"]}>
              Attachment
            </div>
          </div>
        </div>
        <div
          className={
            classes["view-ticket-container__view-ticket-details-wrapper"]
          }
        >
          <div
            className={
              classes["view-ticket-container__view-ticket-information-wrapper"]
            }
          >
            <div className={classes["view-ticket-information-wrapper__title"]}>
              Ticket Information
            </div>
            <div
              className={classes["view-ticket-information-wrapper__ticket-id"]}
            >
              Ticket ID: <span>{ticketData?.id}</span>
            </div>
            <div
              className={
                classes["view-ticket-information-wrapper__priority-wrapper"]
              }
            >
              <div
                className={
                  classes[
                    "view-ticket-information-wrapper__priority-wrapper__title"
                  ]
                }
              >
                Priority:
              </div>
              <Select
                defaultValue={prioritySelected}
                style={{
                  width: "100%",
                }}
                // onChange={onChangeSelectPriorityHandler}
              >
                {(Object.keys(Priority) as Array<keyof typeof Priority>).map(
                  (priority) => {
                    return (
                      <Select.Option key={priority} value={priority}>
                        {priority}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </div>

            <div className={classes["view-ticket-information-wrapper__rating"]}>
              Rating: <span>Not Rated</span>
            </div>
            <div
              className={
                classes["view-ticket-information-wrapper__created-date"]
              }
            >
              Created on:{" "}
              <span>
                {moment(ticketData?.createdAt).format("DD MMMM YYYY HH:mm")}
              </span>
            </div>
            <div
              className={classes["view-ticket-information-wrapper__last-msg"]}
            >
              Last message: <span>01/01/2022</span>
            </div>

            <div
              className={
                classes["view-ticket-information-wrapper__category-wrapper"]
              }
            >
              <div></div>
              <div className={classes["category-wrapper__header"]}>
                <div className={classes["category-wrapper__title"]}>
                  Categories
                </div>
                <CategoryAdder
                  ticket={ticketData}
                  currentCategories={ticketData?.categories}
                />
              </div>
            </div>
            <div>
              {ticketData?.categories.map((category) => {
                return (
                  <Tag
                    style={{
                      padding: "0px 4px 0px 4px",
                      textAlign: "center",
                      marginBottom: 2,
                    }}
                    key={category.id}
                    color={stringToColor(category.name)}
                    closable
                    onClose={() => {
                      removeTicketCategory({
                        variables: {
                          ticketId: ticketData.id,
                          categoryId: category.id,
                        },
                      });
                    }}
                  >
                    {category.name}
                  </Tag>
                );
              })}
            </div>
            <div
              className={
                classes["view-ticket-information-wrapper__agent-wrapper"]
              }
            >
              <div
                className={
                  classes[
                    "view-ticket-information-wrapper__agent-wrapper__heading"
                  ]
                }
              >
                <div
                  className={
                    classes[
                      "view-ticket-information-wrapper__agent-wrapper__title"
                    ]
                  }
                >
                  Agents
                </div>
                <div
                  className={
                    classes[
                      "view-ticket-information-wrapper__agent-wrapper__change-option-btn"
                    ]
                  }
                >
                  Change
                </div>
              </div>
              <div className={classes["agent-wrapper__assigned-list"]}>
                {ticketData?.agents.length > 0 ? (
                  <Avatar.Group
                    maxCount={3}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {ticketData?.agents.map((agent) => {
                      return (
                        <Tooltip
                          title={agent.fullName}
                          placement="bottom"
                          key={agent.id}
                        >
                          <Avatar
                            style={{
                              backgroundColor: avatarColor(agent.fullName)
                                .backgroundColor,
                              color: avatarColor(agent.fullName).color,
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
                ) : (
                  <div>Unassigned</div>
                )}
              </div>
            </div>
          </div>
          <div
            className={
              classes["view-ticket-container__view-ticket-history-wrapper"]
            }
          >
            <div className={classes["view-ticket-history-wrapper__title"]}>
              Ticket History
            </div>
            <ul
              className={
                classes["view-ticket-history-wrapper__time-line-wrapper"]
              }
            >
              <li>
                <div className={classes["view-ticket-history-wrapper__time"]}>
                  1st January 2021 <span>&#9679;</span> 22:00
                </div>
                <p>You replied to your ticket.</p>
              </li>
              <li>
                <div className={classes["view-ticket-history-wrapper__time"]}>
                  1st January 2021 <span>&#9679;</span> 22:00
                </div>
                <p>You replied to your ticket.</p>
              </li>
              <li>
                <div className={classes["view-ticket-history-wrapper__time"]}>
                  1st January 2021 <span>&#9679;</span> 22:00
                </div>
                <p>You replied to your ticket.</p>
              </li>
              <li>
                <div className={classes["view-ticket-history-wrapper__time"]}>
                  1st January 2021 <span>&#9679;</span> 22:00
                </div>
                <p>You replied to your ticket.</p>
              </li>
              <li>
                <div className={classes["view-ticket-history-wrapper__time"]}>
                  1st January 2021 <span>&#9679;</span> 22:00
                </div>
                <p>You replied to your ticket.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTicket;
