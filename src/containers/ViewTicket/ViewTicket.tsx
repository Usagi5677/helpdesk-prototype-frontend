import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";
import { useContext, useEffect } from "react";
import { Avatar, Tooltip, Tag, Spin, Alert, Progress } from "antd";
import { stringToColor } from "../../helpers/style";
import UserContext from "../../contexts/UserContext";
import { useLazyQuery, useMutation } from "@apollo/client";
import { HAS_TICKET_ACCESS, TICKET } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Ticket from "../../models/Ticket";
import moment from "moment";
import CategoryAdder from "../../components/common/CategoryAdder";
import {
  REMOVE_FOLLOWER,
  REMOVE_TICKET_CATEGORY,
  SET_OWNER,
  UNASSIGN_AGENT,
} from "../../api/mutations";
import PrioritySelector from "../../components/common/PrioritySelector";
import AgentAdder from "../../components/common/AgentAdder";
import { CloseCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import FollowerAdder from "../../components/common/FollowerAdder";
import AddChecklistItem from "../../components/Ticket/AddChecklistItem";
import ChecklistItem from "../../components/Ticket/ChecklistItem";
import StatusSelector from "../../components/common/StatusSelector";

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
        errorMessage(error, "Unexpected error while unassigning agent.");
      },
      refetchQueries: ["ticket"],
    }
  );

  const [setOwner, { loading: settingOwner }] = useMutation(SET_OWNER, {
    onError: (error) => {
      errorMessage(error, "Unexpected error while setting owner.");
    },
    refetchQueries: ["ticket"],
  });

  const [removeFollower, { loading: removingFollower }] = useMutation(
    REMOVE_FOLLOWER,
    {
      onError: (error) => {
        errorMessage(error, "Unexpected error while removing follower.");
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
  const isOwner = ticketData?.ownerId === user?.id;
  const progressPercentage = Math.round(
    (ticketData?.checklistItems.filter((item) => item.completedAt !== null)
      .length /
      ticketData?.checklistItems.length) *
      100
  );

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
          maxCount={5}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          {ticketData?.agents.map((agent) => {
            return (
              <Tooltip
                title={
                  <>
                    {ticketData?.ownerId === agent.id && (
                      <div>Ticket Owner</div>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {agent.fullName} ({agent.rcno})
                      {(user?.isAdmin || isOwner) &&
                        ticketData?.ownerId !== agent.id && (
                          <Tooltip title="Set as owner">
                            <UpCircleOutlined
                              style={{ cursor: "pointer", marginLeft: 3 }}
                              onClick={() => {
                                setOwner({
                                  variables: {
                                    ticketId: ticketData?.id,
                                    agentId: agent.id,
                                  },
                                });
                              }}
                            />
                          </Tooltip>
                        )}
                      {(user?.isAdmin || user?.id === agent.id) && (
                        <CloseCircleOutlined
                          style={{
                            cursor: "pointer",
                            marginLeft: 3,
                          }}
                          onClick={() => {
                            unassignAgent({
                              variables: {
                                ticketId: ticketData?.id,
                                agentId: agent.id,
                              },
                            });
                          }}
                        />
                      )}
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
      )
    );
  };

  const renderFollowers = () => {
    return (
      ticketData?.followers.length > 0 && (
        <Avatar.Group
          maxCount={5}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          {ticketData?.followers.map((follower) => {
            return (
              <Tooltip
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {follower.fullName} ({follower.rcno})
                    {(follower.id === user?.id || isAdminOrAssigned) && (
                      <CloseCircleOutlined
                        style={{ cursor: "pointer", marginLeft: 3 }}
                        onClick={() => {
                          removeFollower({
                            variables: {
                              ticketId: ticketData.id,
                              deletingFollowerId: follower.id,
                            },
                          });
                        }}
                      />
                    )}
                  </div>
                }
                placement="bottom"
                key={follower.id}
              >
                <Avatar
                  style={{
                    backgroundColor: stringToColor(follower.fullName),
                  }}
                >
                  {follower.fullName
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
                {(loadingTicket ||
                  loadingRemoveTicketCategory ||
                  unassigning ||
                  removingFollower ||
                  settingOwner) && <Spin />}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                {renderInfoLeftSide("Status")}
                {isAdminOrAssigned ? (
                  <StatusSelector ticket={ticketData} />
                ) : (
                  <>{renderInfoRightSide(`${ticketData?.status}`)}</>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 5,
                  flexWrap: "wrap",
                }}
              >
                {renderInfoLeftSide("Followers")}
                {isAdminOrAssigned || user?.id === ticketData?.createdBy.id ? (
                  <FollowerAdder ticket={ticketData} />
                ) : (
                  <>{renderFollowers()}</>
                )}
              </div>
              {isAdminOrAssigned && renderFollowers()}
            </div>
            {ticketData?.checklistItems.length > 0 ? (
              <div
                style={{
                  width: "100%",
                  minWidth: 280,
                  backgroundColor: "white",
                  borderRadius: 20,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px 20px",
                  fontSize: "0.75rem",
                  overflowY: "auto",
                  margin: "0 10px 0 20px",
                }}
              >
                <Progress
                  percent={progressPercentage}
                  strokeWidth={5}
                  style={{ marginBottom: 10 }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: 80,
                    }}
                  >
                    Checklist
                  </div>
                  {isAdminOrAssigned && (
                    <AddChecklistItem ticket={ticketData} />
                  )}
                </div>
                {ticketData?.checklistItems.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    ticketId={ticketData.id}
                    item={item}
                    isAdminOrAssigned={isAdminOrAssigned}
                  />
                ))}
              </div>
            ) : (
              <>
                {isAdminOrAssigned && <AddChecklistItem ticket={ticketData} />}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTicket;
