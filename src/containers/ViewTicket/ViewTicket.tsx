import { FaChevronDown, FaArrowLeft, FaTimes, FaSearch } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";
import DefaultAvatar from "../../components/UI/DefaultAvatar/DefaultAvatar";
import { MyTicketData } from "../MyTickets/MyTicketsData";
import { useEffect, useState } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import { Select, Avatar, Modal, Tooltip } from "antd";

/*
  List used for assigning
*/
const groupList = [
  {
    id: "G1",
    name: "Software",
    agents: [
      { id: "U1", name: "Ibrahim Naish1" },
      { id: "U2", name: "Ibrahim Naish2" },
    ],
  },
  {
    id: "G2",
    name: "AGroup A",
    agents: [
      { id: "U3", name: "Ibrahim Naish3" },
      { id: "U4", name: "Ibrahim Naish4" },
    ],
  },
  {
    id: "G3",
    name: "BGroup B",
    agents: [
      { id: "U5", name: "Ibrahim Naish5" },
      { id: "U6", name: "Ibrahim Naish6" },
    ],
  },
  {
    id: "G4",
    name: "CGroup C",
    agents: [
      { id: "U7", name: "Ibrahim Naish7" },
      { id: "U1", name: "Ibrahim Naish1" },
    ],
  },
  {
    id: "G5",
    name: "DGroup D",
    agents: [{ id: "U4", name: "Ibrahim Naish4" }],
  },
];

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
  { id: "C1", name: "Problem1" },
  { id: "C2", name: "Problem2" },
  { id: "C3", name: "Problem3" },
  { id: "C4", name: "Problem4" },
  { id: "C5", name: "Problem5" },
];

const ViewTicket = (props: any) => {
  const { ticketID } = useParams();

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState("Choose category");

  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [groupMenuAssignList, setGroupMenuAssignList] = useState<any>([]);
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [agentMenuAssignList, setAgentMenuAssignList] = useState<any>([]);

  const [agentAssignedList, setAgentAssignedList] = useState<any>([]);

  /*
    Used param state to get id from url
    using filter on ticket data file to return ticket data of ticket id
  */
  let ticketData = MyTicketData.filter((ticket) => {
    return ticket.ticketID === ticketID;
  });

  useEffect(() => {
    setAgentAssignedList(
      ticketData[0].agent?.map((agent) => {
        return {
          id: agent.id,
          name: agent.name,
        };
      })
    );

    //update the agent menu assign list
    setAgentMenuAssignList(
      ticketData[0].agent?.map((agent) => {
        return agent.id;
      })
    );

    //let groupID: any = ticketData[0].group?.[1]?.id;
    //let groupLength: any = ticketData[0].group?.length;
  }, []);

  /*
    This is the final step. When clicked it will combine group and agent list
    after that it getting all the unique values by checking id. Then setting it
  */
  const onSubmitUpdateAssignList = () => {
    let assignedListArray: any = [];
    for (let index = 0; index < groupMenuAssignList?.length; index++) {
      let groupValue: any = groupList.find((group: any) => group.id === groupMenuAssignList[index]);

      for (let index2 = 0; index2 < groupValue.agents?.length; index2++) {
        assignedListArray.push({
          id: groupValue.agents[index2].id,
          name: groupValue.agents[index2].name,
        });
      }
    }

    for (let index = 0; index < agentMenuAssignList.length; index++) {
      let agentValue: any = agentList.find((agent: any) => agent.id === agentMenuAssignList[index]);
      assignedListArray.push({
        id: agentValue.id,
        name: agentValue.name,
      });
    }

    let newUniqueList: any = [];
    assignedListArray.map((assign: any) => {
      let findAgent = newUniqueList.find((agent: any) => agent.id === assign.id);
      if (!findAgent) newUniqueList.push(assign);
    });

    //add to ticket data
    ticketData[0].agent = newUniqueList;
    setAgentAssignedList(newUniqueList);

    //update the agent menu assign list
    setAgentMenuAssignList(
      ticketData[0].agent?.map((agent) => {
        return agent.id;
      })
    );

    setGroupMenuAssignList([]);
    setIsGroupModalVisible(false);
    setIsAgentModalVisible(false);
  };

  const onClickOpenCategoryDropdownHandler = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const onClickSelectCategoryHandler = (event: any, value: any) => {
    setCategorySelected(value);
    ticketData[0].category = value;
  };

  const showGroupModal = () => {
    setGroupMenuAssignList([]);
    setIsGroupModalVisible(true);
  };
  const showAgentModal = () => {
    setIsAgentModalVisible(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalVisible(false);
  };
  const closeAgentModal = () => {
    setIsAgentModalVisible(false);
  };

  const onGroupSelectHandler = (id: any) => {
    const newList = [...groupMenuAssignList];
    newList.push(id);
    setGroupMenuAssignList(newList);
  };

  const onGroupDeSelectHandler = (id: any) => {
    const newList = [...groupMenuAssignList];
    setGroupMenuAssignList(newList.filter((agentID) => agentID !== id));
  };

  const onAgentSelectHandler = (id: any) => {
    const newList = [...agentMenuAssignList];
    newList.push(id);
    setAgentMenuAssignList(newList);
  };

  const onAgentDeSelectHandler = (id: any) => {
    const newList = [...agentMenuAssignList];
    setAgentMenuAssignList(newList.filter((agentID) => agentID !== id));
  };

  return (
    <>
      <Modal
        title="Group Assign"
        visible={isGroupModalVisible}
        onOk={onSubmitUpdateAssignList}
        onCancel={closeGroupModal}
        destroyOnClose={true}
      >
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Select"
          onSelect={onGroupSelectHandler}
          onDeselect={onGroupDeSelectHandler}
          allowClear
          filterOption={(input, option: any) => {
            return (
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {groupList.map((group: any, groupIndex: number) => {
            return (
              <Select.Option key={group.id + groupIndex} value={group.id} label={group.name}>
                {group.name}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>

      <Modal
        title="Agent Assign"
        visible={isAgentModalVisible}
        onOk={onSubmitUpdateAssignList}
        onCancel={closeAgentModal}
      >
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Select"
          onSelect={onAgentSelectHandler}
          onDeselect={onAgentDeSelectHandler}
          defaultValue={agentMenuAssignList}
          allowClear
          filterOption={(input, option: any) => {
            return (
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {agentList.map((agent: any, agentIndex: number) => {
            return (
              <Select.Option key={agent.id + agentIndex} value={agent.id} label={agent.name}>
                {agent.name}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>

      <div className={classes["view-ticket-container"]}>
        <div className={classes["view-ticket-container__view-ticket-wrapper"]}>
          <div className={classes["view-ticket-wrapper__header"]}>
            <button className={classes["view-ticket-wrapper__back-btn"]}>
              <FaArrowLeft /> <span>Back</span>
            </button>
            <div className={classes["view-ticket-wrapper__title"]}>
              {ticketData[0].ticketID} - {ticketData[0].ticketTitle}
            </div>
            <div className={classes["view-ticket-wrapper__spacer"]}></div>
          </div>
          <div className={classes["view-ticket-wrapper__tab-wrapper"]}>
            <div className={classes["view-ticket-wrapper__tab-wrapper_tab"]}>Conversation</div>
            <div className={classes["view-ticket-wrapper__tab-wrapper_tab"]}>Attachment</div>
          </div>
        </div>
        <div className={classes["view-ticket-container__view-ticket-details-wrapper"]}>
          <div className={classes["view-ticket-container__view-ticket-information-wrapper"]}>
            <div className={classes["view-ticket-information-wrapper__title"]}>
              Ticket Information
            </div>
            <div className={classes["view-ticket-information-wrapper__ticket-id"]}>
              Ticket ID: <span>{ticketData[0].ticketID}</span>
            </div>
            <div className={classes["view-ticket-information-wrapper__priority-wrapper"]}>
              <div className={classes["view-ticket-information-wrapper__priority-wrapper__title"]}>
                Priority:
              </div>
              <div
                className={
                  classes["view-ticket-information-wrapper__priority-wrapper__select-wrapper"]
                }
              >
                <select name="" id="">
                  <option value="0">Priority</option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                  <option value="4">Urgent</option>
                </select>
                <div className={classes["view-ticket-information-wrapper__select-wrapper__icon"]}>
                  <FaChevronDown />
                </div>
              </div>
            </div>

            <div className={classes["view-ticket-information-wrapper__category-wrapper"]}>
              <div className={classes["category-wrapper__title"]}>Category:</div>
              <div
                className={classes["category-wrapper__dropdown-wrapper"]}
                onClick={onClickOpenCategoryDropdownHandler}
              >
                <div className={classes["category-wrapper__dropdown-wrapper__selected"]}>
                  {categorySelected}
                </div>
                {categoryDropdownOpen && (
                  <>
                    <Backdrop
                      show={categoryDropdownOpen}
                      clicked={onClickOpenCategoryDropdownHandler}
                      invisible
                      zIndex={10}
                    />
                    <div className={classes["category-wrapper__dropdown-content-wrapper"]}>
                      {categoryList.map((option) => {
                        return (
                          <div
                            key={option.id}
                            className={classes["dropdown-content-wrapper__dropdown-item"]}
                            data-categoryid={option.id}
                            onClick={(event) => {
                              onClickSelectCategoryHandler(event, option.name);
                            }}
                          >
                            {option.name}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={classes["view-ticket-information-wrapper__rating"]}>
              Rating: <span>Not Rated</span>
            </div>
            <div className={classes["view-ticket-information-wrapper__created-date"]}>
              Created date: <span>{ticketData[0].createdDate}</span>
            </div>
            <div className={classes["view-ticket-information-wrapper__last-msg"]}>
              Last message: <span>01/01/2022</span>
            </div>

            <div className={classes["view-ticket-information-wrapper__group-wrapper"]}>
              <div className={classes["view-ticket-information-wrapper__group-wrapper__heading"]}>
                <div className={classes["view-ticket-information-wrapper__group-wrapper__title"]}>
                  Group
                </div>
                <div
                  className={
                    classes["view-ticket-information-wrapper__group-wrapper__change-option-btn"]
                  }
                  onClick={showGroupModal}
                >
                  Change
                </div>
              </div>
            </div>
            <div className={classes["view-ticket-information-wrapper__agent-wrapper"]}>
              <div className={classes["view-ticket-information-wrapper__agent-wrapper__heading"]}>
                <div className={classes["view-ticket-information-wrapper__agent-wrapper__title"]}>
                  Agent:
                </div>
                <div
                  className={
                    classes["view-ticket-information-wrapper__agent-wrapper__change-option-btn"]
                  }
                  onClick={showAgentModal}
                >
                  Change
                </div>
              </div>
              <div className={classes["agent-wrapper__assigned-list"]}>
                {ticketData[0].agent && ticketData[0].agent.length > 0 ? (
                  <Avatar.Group
                    maxCount={3}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {agentAssignedList.map((assignedList: any, assignedListIndex: number) => {
                      return (
                        <Tooltip
                          title={assignedList.name}
                          placement="bottom"
                          key={assignedListIndex}
                        >
                          <Avatar
                            style={{
                              backgroundColor: "red",
                            }}
                          >
                            {assignedList.name
                              .match(/^\w|\b\w(?=\S+$)/g)
                              .join()
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
          <div className={classes["view-ticket-container__view-ticket-history-wrapper"]}>
            <div className={classes["view-ticket-history-wrapper__title"]}>Ticket History</div>
            <ul className={classes["view-ticket-history-wrapper__time-line-wrapper"]}>
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
