import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";

import { MyTicketData } from "../MyTickets/MyTicketsData";
import { useEffect, useState } from "react";

import { Select, Avatar, Modal, Tooltip, Tag } from "antd";
import { avatarColor } from "../../helpers/avatarColor";
import { stringToColor } from "../../helpers/style";

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
  { id: "C1", name: "ProblemOne" },
  { id: "C2", name: "ProblemTwo" },
  { id: "C3", name: "ProblemThree" },
  { id: "C4", name: "ProblemFour" },
  { id: "C5", name: "ProblemFive" },
];

/*
  List used for assigning priority
*/
const priorityList = [
  { id: "P1", name: "Low" },
  { id: "P2", name: "Medium" },
  { id: "P3", name: "High" },
  { id: "p4", name: "Urgent" },
];

const ViewTicket = (props: any) => {
  const { ticketID } = useParams();

  const [prioritySelected, setPrioritySelected] = useState("Choose Priority");

  const [groupMenuAssignList, setGroupMenuAssignList] = useState<any>([]);
  const [agentMenuAssignList, setAgentMenuAssignList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);

  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  const [agentAssignedList, setAgentAssignedList] = useState<any>([]);
  const [categoriesAssignedList, setCategoriesAssignedList] = useState<any>([]);
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


    setCategoriesAssignedList(
      ticketData[0].category?.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      })
    );

    //update the agent menu assign list
    setAgentMenuAssignList(
      ticketData[0].agent?.map((agent) => {
        return agent.id;
      })
    );

    //update the category menu assign list
    setCategoriesList(
      ticketData[0].category?.map((category) => {
        return category.id;
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

  

  const onSubmitUpdateCategoryList = (id: any) => {
    let assignedListArray: any = [];

    for (let index = 0; index < categoriesList?.length; index++) {
      let categoryValue: any = categoryList.find(
        (category: any) => category.id === categoriesList[index]
      );
 
      assignedListArray.push({
        id: categoryValue.id,
        name: categoryValue.name,
      });
    }

    let newUniqueList: any = [];
    assignedListArray.map((assign: any) => {
      let findCategory = newUniqueList.find((category: any) => category.id === assign.id);
      if (!findCategory) newUniqueList.push(assign);
    });

    //add to ticket data
    ticketData[0].category = newUniqueList;
    //setCategoriesList(newUniqueList);
    setCategoriesAssignedList(newUniqueList);

    setIsCategoryModalVisible(false);
  };

  const onChangeSelectPriorityHandler = (id: any) => {
    setPrioritySelected(id);
    ticketData[0].priority = id;
  };

  //show modal
  const showGroupModal = () => {
    setGroupMenuAssignList([]);
    setIsGroupModalVisible(true);
  };
  const showAgentModal = () => {
    setIsAgentModalVisible(true);
  };
  const showCategoryModal = () => {
    setIsCategoryModalVisible(true);
  };

  //close modal
  const closeGroupModal = () => {
    setIsGroupModalVisible(false);
  };
  const closeAgentModal = () => {
    setIsAgentModalVisible(false);
  };
  const closeCategoryModal = () => {
    setIsCategoryModalVisible(false);
  };

  //group
  const onSelectGroupHandler = (id: any) => {
    const newList = [...groupMenuAssignList];
    newList.push(id);
    setGroupMenuAssignList(newList);
  };

  const onDeSelectGroupHandler = (id: any) => {
    const newList = [...groupMenuAssignList];
    setGroupMenuAssignList(newList.filter((agentID) => agentID !== id));
  };

  //agent
  const onSelectAgentHandler = (id: any) => {
    const newList = [...agentMenuAssignList];
    newList.push(id);
    setAgentMenuAssignList(newList);
  };

  const onDeSelectAgentHandler = (id: any) => {
    const newList = [...agentMenuAssignList];
    setAgentMenuAssignList(newList.filter((agentID) => agentID !== id));
  };

  //category
  const onSelectCategoryHandler = (id: any) => {
    const newList = [...categoriesList];
    newList.push(id);
    setCategoriesList(newList);
  };

  const onDeSelectCategoryHandler = (id: any) => {
    const newList = [...categoriesList];
    setCategoriesList(newList.filter((categoryID) => categoryID !== id));
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
          onSelect={onSelectGroupHandler}
          onDeselect={onDeSelectGroupHandler}
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
          onSelect={onSelectAgentHandler}
          onDeselect={onDeSelectAgentHandler}
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

      <Modal
        title="Category Assign"
        visible={isCategoryModalVisible}
        onOk={onSubmitUpdateCategoryList}
        onCancel={closeCategoryModal}
      >
        <Select
         
          style={{
            width: "100%",
          }}
          mode="multiple"
          placeholder="Select"
          onSelect={onSelectCategoryHandler}
          onDeselect={onDeSelectCategoryHandler}
          defaultValue={categoriesList}
        >
          {categoryList.map((category:any, categoryIndex) => {
            return (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
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
              <Select
                defaultValue={prioritySelected}
                style={{
                  width: "100%",
                }}
                onChange={onChangeSelectPriorityHandler}
              >
                {priorityList.map((priority) => {
                  return (
                    <Select.Option key={priority.id} value={priority.id}>
                      {priority.name}
                    </Select.Option>
                  );
                })}
              </Select>
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

            <div className={classes["view-ticket-information-wrapper__category-wrapper"]}>
              <div className={classes["category-wrapper__header"]}>
                <div className={classes["category-wrapper__title"]}>Category</div>
                <div
                  className={classes["category-wrapper__change-option-btn"]}
                  onClick={showCategoryModal}
                >
                  Change
                </div>
              </div>
            </div>
            <div className={classes["category-wrapper__category-list"]}>
            {ticketData[0].category && ticketData[0].category.length > 0 ? (
              categoriesAssignedList.map((category: any, categoryIndex: any) => {
                return (
                  <Tag
                    style={{padding: "0px 4px 0px 4px", textAlign:"center"}}
                    key={category.id + categoryIndex}
                    color={stringToColor(category.name)}
                  >
                    {category.name}
                  </Tag>
                );
              })
            ) : (
              <div>Unassigned</div>
            )}
              
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
                              backgroundColor: avatarColor(assignedList.name).backgroundColor,
                              color: avatarColor(assignedList.name).color,
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
