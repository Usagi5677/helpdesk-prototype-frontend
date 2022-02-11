import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";
import { useContext, useEffect } from "react";
import { Avatar, Tooltip, Tag, Spin, Alert } from "antd";
import { avatarColor } from "../../helpers/avatarColor";
import { stringToColor } from "../../helpers/style";
import UserContext from "../../contexts/UserContext";
import { useLazyQuery, useMutation } from "@apollo/client";
import { HAS_TICKET_ACCESS, TICKET } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import moment from "moment";
import CategoryAdder from "../../components/common/CategoryAdder";
import { REMOVE_TICKET_CATEGORY, UNASSIGN_AGENT } from "../../api/mutations";
import PrioritySelector from "../../components/common/PrioritySelector";
import AgentAdder from "../../components/common/AgentAdder";
import { CloseCircleOutlined } from "@ant-design/icons";

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
      notifyOnNetworkStatusChange: true,
    }
  );

  const [removeTicketCategory, { loading: loadingRemoveTicketCategory }] =
    useMutation(REMOVE_TICKET_CATEGORY, {
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing category.");
      },
      refetchQueries: ["ticket"],
    });

  const [unassignAgent, { loading: unassigning }] = useMutation(
    UNASSIGN_AGENT,
    {
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing category.");
      },
      refetchQueries: ["ticket"],
    }
  );

  useEffect(() => {
    hasAccess({ variables: { ticketId: parseInt(id) } });
  }, []);

  const ticketData: Ticket = ticket?.ticket;
  const isAssigned = ticketData?.agents
    .map((a: any) => a.id)
    .includes(user?.id);
  const isAdminOrAssigned = user?.isAdmin || (user?.isAgent && isAssigned);

  const renderInfoLeftSide = (label: string) => (
    <div style={{ width: 100 }}>{label}</div>
  );
  const renderInfoRightSide = (label: string) => (
    <div style={{ fontWeight: 700 }}>{label}</div>
  );
  const renderInfoRow = (left: string, right: string) => (
    <div style={{ display: "flex", marginBottom: 5, marginTop: 5 }}>
      {renderInfoLeftSide(left)}
      {renderInfoRightSide(right)}
    </div>
  );

  const renderCategories = () => {
    return ticketData?.categories.map((category) => {
      return (
        <Tag
          style={{
            padding: "0px 4px 0px 4px",
            textAlign: "center",
            marginBottom: 2,
          }}
          key={category.id}
          color={stringToColor(category.name)}
          closable={isAdminOrAssigned ? true : false}
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
    });
  };

  const renderAgents = () => {
    return (
      ticketData?.agents.length > 0 && (
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
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {agent.fullName} ({agent.rcno})
                    <CloseCircleOutlined
                      style={{ cursor: "pointer", marginLeft: 3 }}
                      onClick={() => {
                        unassignAgent({
                          variables: {
                            ticketId: ticketData.id,
                            agentId: agent.id,
                          },
                        });
                      }}
                    />
                  </div>
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
      )
    );
  };

  return (
    <>
      {loadingAccess && "Loading..."}
      {access?.hasTicketAccess === false ? (
        <Alert
          type="error"
          message="This ticket does not exist or you do not have access to this ticket."
        />
      ) : (
        <div className={classes["view-ticket-container"]}>
          <div
            className={classes["view-ticket-container__view-ticket-wrapper"]}
          >
            <div className={classes["view-ticket-wrapper__header"]}>
              <button className={classes["view-ticket-wrapper__back-btn"]}>
                <FaArrowLeft /> <span>Back</span>
              </button>
              <div className={classes["view-ticket-wrapper__title"]}>
                {ticketData?.title}
              </div>
              <div style={{ width: 28 }}>
                {(loadingTicket || loadingRemoveTicketCategory) && <Spin />}
              </div>
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
                classes[
                  "view-ticket-container__view-ticket-information-wrapper"
                ]
              }
            >
              <div
                className={classes["view-ticket-information-wrapper__title"]}
              >
                Ticket Information
              </div>
              {renderInfoRow("Ticket ID", `${ticketData?.id}`)}
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderInfoLeftSide("Priority")}
                {isAdminOrAssigned ? (
                  <PrioritySelector ticket={ticketData} />
                ) : (
                  <>{renderInfoRightSide(`${ticketData?.priority}`)}</>
                )}
              </div>
              {renderInfoRow("Rating", `Not Rated`)}
              {renderInfoRow(
                "Created on",
                moment(ticketData?.createdAt).format("DD MMMM YYYY HH:mm")
              )}
              {renderInfoRow(
                "Last message",
                moment().format("DD MMMM YYYY HH:mm")
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                  flexWrap: "wrap",
                }}
              >
                {renderInfoLeftSide("Categories")}
                {isAdminOrAssigned ? (
                  <CategoryAdder ticket={ticketData} />
                ) : (
                  <>{renderCategories()}</>
                )}
              </div>
              {isAdminOrAssigned && renderCategories()}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                  flexWrap: "wrap",
                }}
              >
                {renderInfoLeftSide("Agents")}
                {isAdminOrAssigned ? (
                  <AgentAdder ticket={ticketData} />
                ) : (
                  <>{renderAgents()}</>
                )}
              </div>
              {isAdminOrAssigned && renderAgents()}
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
      )}
    </>
  );
};

export default ViewTicket;
