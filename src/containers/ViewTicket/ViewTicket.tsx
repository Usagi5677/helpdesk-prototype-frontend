import { FaChevronDown, FaArrowLeft, FaTimes, FaSearch } from "react-icons/fa";
import { useParams } from "react-router";
import classes from "./ViewTicket.module.css";
import DefaultAvatar from "../../components/UI/DefaultAvatar/DefaultAvatar";
import { MyTicketData } from "../MyTickets/MyTicketsData";
import { useEffect, useState } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

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

const ViewTicket = (props: any) => {
  const { ticketID } = useParams();
  const [checkedGroupList, setCheckedGroupList] = useState<any>([]);
  const [checkedAgentList, setCheckedAgentList] = useState<any>([]);
  const [searchGroup, setSearchGroup] = useState("");
  const [searchAgent, setSearchAgent] = useState("");
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const [groupMenuAssignList, setGroupMenuAssignList] = useState<any>([]);
  const [agentMenuAssignList, setAgentMenuAssignList] = useState<any>([]);
  //limit for default avatar, if it goes beyond this it will put it all in one defaultavatar
  let maxAgentMenuAssign = 3;
  let maxGroupMenuAssign = 3;
  let maxAgentAssign = 3;

  /*
    Used param state to get id from url
    using filter on ticket data file to return ticket data of ticket id
  */
  let ticketData = MyTicketData.filter((ticket) => {
    return ticket.ticketID === ticketID;
  });

  /*
    When ViewTicket renders it will run this once
    first copying the array and then setting it in the state
    for each user in list give a new attribute called 'checked'
    if the id is equal to the one in ticket data then give 'true'
  */
  useEffect(() => {
    let newListOfAgents = agentList.slice();
    let newListOfGroups = groupList.slice();

    setCheckedAgentList(
      newListOfAgents.map((agent) => {
        return {
          ...agent,
          checked: !!ticketData[0].agent?.find(function (value) {
            return value.id === agent.id;
          }),
        };
      })
    );

    //checked false for grouplist since it's values are not saved in DB
    setCheckedGroupList(
      newListOfGroups.map((group) => {
        return {
          ...group,
          checked: false,
        };
      })
    );

    //since there's a chance that ticket already has assigned users. So updating the array before using it
    setAgentMenuAssignList(
      ticketData[0].agent?.map((agent) => {
        return {
          id: agent.id,
          name: agent.name,
          checked: true,
        };
      })
    );
    //let groupID: any = ticketData[0].group?.[1]?.id;
    //let groupLength: any = ticketData[0].group?.length;
  }, []);

  /*
    When clicked it will set a new array to the state.
    making a copy of array again before setting it to the state,
    for each one in array(copy) it will check the current id is equal to 
    the one in array, if it is then it will use the checkbox boolean value
    to update the checked attribute. Then it will update the state with the modified array.

    Checking each element in array because filter function requires this. When the search
    function filters the list it will reset the index so checked items will also get reseted 
    depending on what was 'searched'. To prevent this a new attribute called 'checked' is made and 
    will have to loop through all to see if it matches, if so it will give true. This way checked will
    stay the same even when using filter (search) function
  */
  const onChangeGroupCheckboxHandler = (event: any) => {
    let id = event.target.value;
    let newCheckedLists = [...checkedGroupList];

    /*
      This is for the small assign list inside menu. Using a separate state/array because
      checkedGroupList changes state of all the DefaultAvatars, this means when it reaches
      limit it changes all avatars into plus sign. Also, it makes last element in list into a plus
      defaultAvatar without other items being entered. So, to prevent this using another array just
      to show the assign list inside the menu before clicking ok btn
    */
    let tempArray = [...groupMenuAssignList];
    if (event.target.checked) {
      //add
      tempArray.push({
        ...groupMenuAssignList,
        id: event.target.value,
        name: event.target.dataset.value,
      });
      setGroupMenuAssignList(tempArray);
    } else {
      //remove
      setGroupMenuAssignList(tempArray.filter((group) => group.id !== event.target.value));
    }

    setCheckedGroupList(
      newCheckedLists.map((newCheckedList) =>
        newCheckedList.id === id
          ? { ...newCheckedList, checked: event.target.checked }
          : newCheckedList
      )
    );
  };

  /*
    Used for onChange handler for finding group. 
    it will set the state with input so that it will filter the 
    list based on the input given here
  */
  const onChangeSearchGroupHandler = (event: any) => {
    setSearchGroup(event.target.value);
  };

  const onClickGroupMenuClear = () => {
    let newCheckedLists = [...checkedGroupList];
    //let tempArray = [...groupMenuAssignList];

    setCheckedGroupList(
      newCheckedLists.map((newCheckedList) => {
        return { ...newCheckedList, checked: false };
      })
    );
    setGroupMenuAssignList([]);
  };

  /*
    State used for opening and closing the group menu
  */
  const openGroupMenuHandler = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };

  /*
    This is the final step. When clicked it will check group & agent
    list to see if it has checked 'true' value or not, if there is then it will
    push it to a temp array and then return values of unique id. After that replace
    ticket data file with new unique temp array.
  */
  const onClickUpdateAssignList = () => {
    let assignedListArray: any = [];

    //checking group and adding
    for (let index = 0; index < checkedGroupList?.length; index++) {
      if (checkedGroupList[index].checked === true) {
        for (let index2 = 0; index2 < checkedGroupList[index].agents?.length; index2++) {
          assignedListArray.push({
            id: checkedGroupList[index].agents[index2].id,
            name: checkedGroupList[index].agents[index2].name,
          });
        }
      }
    }
    console.log("assignedListArray");
    console.log(assignedListArray);

    //checking agent and adding
    for (let index = 0; index < checkedAgentList.length; index++) {
      if (checkedAgentList[index].checked === true) {
        assignedListArray.push({
          id: checkedAgentList[index].id,
          name: checkedAgentList[index].name,
        });
      }
    }

    //find unique id and then add
    const uniqueAssigns: any[] = [];
    assignedListArray.map((assign: any) => {
      let findAgent = uniqueAssigns.find((agent) => agent.id === assign.id);
      if (!findAgent) uniqueAssigns.push(assign);
    });
    console.log("uniqueAssigns");
    console.log(uniqueAssigns);

    //add to ticket data
    ticketData[0].agent = uniqueAssigns;



    //reset checked group list and group menu assign list
    let newListOfGroups = [...checkedGroupList];
    setCheckedGroupList(
      newListOfGroups.map((newListOfGroup) => {
        return { ...newListOfGroup, checked: false };
      })
    );
    setGroupMenuAssignList([]);


    //update the checkedagentlist
    let newListOfAgents = agentList.slice();
    setCheckedAgentList(
      newListOfAgents.map((agent) => {
        return {
          ...agent,
          checked: !!ticketData[0].agent?.find(function (value) {
            return value.id === agent.id;
          }),
        };
      })
    );

    //update the agent menu assign list
    setAgentMenuAssignList(
      ticketData[0].agent?.map((agent) => {
        return {
          id: agent.id,
          name: agent.name,
          checked: true,
        };
      })
    );

    //close menu
    setGroupMenuOpen(false);
    setAgentMenuOpen(false);
  };

  /*
    Used this for checking if there is a assigned group to the ticket
    if there is then it will be used as a condition to render the defaultAvatar 
  */
  let checkedGroupExist;
  for (let index = 0; index < checkedGroupList.length; index++) {
    if (checkedGroupList[index].checked === true) {
      checkedGroupExist = true;
    }
  }

  /*
    This is used for the dafaultAvatar. In here the condition is
    if there is more than 3 assign then it will save the rest of the assigned users
    in this variable called 'moreThanThreeAssign'. Can change to any amount if you want.
    this is used because there is not enough space sometimes so rest of the assigned users will be
    seen through hover over the last DefaultAvatar which is a plus sign
  */
  let moreThanThreeGroup: any;
  let groupLength: any = groupMenuAssignList?.length;
  if (groupLength > 2) {
    moreThanThreeGroup = groupMenuAssignList?.slice(3, groupLength);
  }

  /*
    Agent menu - same process as group
  */

  const openAgentMenuHandler = () => {
    setAgentMenuOpen(!agentMenuOpen);
  };

  const onChangeAgentCheckboxHandler = (event: any) => {
    let id = event.target.value;
    let newCheckedLists = [...checkedAgentList];

    let tempArray = [...agentMenuAssignList];

    if (event.target.checked) {
      tempArray.push({ id: event.target.value, name: event.target.dataset.value });
      console.log(tempArray);
      setAgentMenuAssignList(tempArray);
    } else {
      setAgentMenuAssignList(tempArray.filter((agent) => agent.id !== event.target.value));
    }

    setCheckedAgentList(
      newCheckedLists.map((newCheckedList) =>
        newCheckedList.id === id
          ? { ...newCheckedList, checked: event.target.checked }
          : newCheckedList
      )
    );
  };

  const onChangeSearchAgentHandler = (event: any) => {
    setSearchAgent(event.target.value);
  };

  const onClickAgentMenuClear = () => {
    let newCheckedLists = [...checkedAgentList];
    //let tempArray = [...groupMenuAssignList];

    setCheckedAgentList(
      newCheckedLists.map((newCheckedList) => {
        return { ...newCheckedList, checked: false };
      })
    );
    setAgentMenuAssignList([]);
  };

  let moreThanThreeAgent: any;
  let agentLength: any = agentMenuAssignList?.length;
  if (agentLength > 2) {
    moreThanThreeAgent = agentMenuAssignList?.slice(3, agentLength);
  }

  let checkedAgentExist;
  for (let index = 0; index < checkedAgentList.length; index++) {
    if (checkedAgentList[index].checked === true) {
      checkedAgentExist = true;
    }
  }

  return (
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
              <div>
                <div className={classes["group-wrapper__change-option-container"]}>
                  <>
                    <Backdrop
                      show={groupMenuOpen}
                      clicked={openGroupMenuHandler}
                      invisible
                      zIndex={10}
                    />
                    {groupMenuOpen && (
                      <div className={classes["group-wrapper__change-option-wrapper"]}>
                        <div className={classes["group-wrapper__change-option-wrapper__heading"]}>
                          <div className={classes["group-wrapper__change-option-wrapper__title"]}>
                            Group
                          </div>
                          <div
                            className={classes["group-wrapper__change-option-wrapper__close-btn"]}
                            onClick={openGroupMenuHandler}
                          >
                            <FaTimes />
                          </div>
                        </div>
                        <div
                          className={
                            classes["group-wrapper__change-option-wrapper__search-wrapper"]
                          }
                        >
                          <div
                            className={classes["my-tickets-options-wrapper__search-wrapper_icon"]}
                          >
                            <FaSearch />
                          </div>
                          <input
                            className={classes["group-wrapper__change-option-wrapper__search"]}
                            placeholder="Search"
                            onChange={onChangeSearchGroupHandler}
                          ></input>
                        </div>
                        <div
                          className={`${
                            classes["group-wrapper__change-option-wrapper__assigned-wrapper"]
                          } ${checkedGroupExist ? classes["active"] : ""}`}
                        >
                          {checkedGroupExist &&
                            groupMenuAssignList.map(
                              (checkedGroupValue: any, checkedGroupIndex: number) => {
                                if (checkedGroupIndex === maxGroupMenuAssign) {
                                  return (
                                    <DefaultAvatar
                                      key={checkedGroupIndex}
                                      fullname={checkedGroupValue.name}
                                      userAvatarWidth={"22px"}
                                      userAvatarHeight={"22px"}
                                      agentList={checkedGroupValue.name}
                                      showAgentList={true}
                                      moreThan={moreThanThreeGroup}
                                      ticketID={ticketData[0].ticketID}
                                      squareShaped
                                    />
                                  );
                                } else if (
                                  checkedGroupIndex >= 0 &&
                                  checkedGroupIndex < maxGroupMenuAssign
                                ) {
                                  return (
                                    <DefaultAvatar
                                      key={checkedGroupIndex}
                                      fullname={checkedGroupValue.name}
                                      userAvatarWidth={"22px"}
                                      userAvatarHeight={"22px"}
                                      agentList={checkedGroupValue.name}
                                      showAgentList={true}
                                      squareShaped
                                    />
                                  );
                                }
                              }
                            )}
                        </div>
                        <div
                          className={
                            classes["group-wrapper__change-option-wrapper__group-list-wrapper"]
                          }
                        >
                          {checkedGroupList
                            .filter((value: any) =>
                              value.name.toLowerCase().includes(searchGroup.toLowerCase())
                            )
                            .map((group: any, groupIndex: number) => {
                              return (
                                <label key={group.id + groupIndex}>
                                  <div
                                    className={
                                      classes[
                                        "change-option-wrapper__group-list-wrapper__list-item-wrapper"
                                      ]
                                    }
                                  >
                                    <div
                                      className={
                                        classes[
                                          "group-list-wrapper__list-item-wrapper__group-detail-wrapper"
                                        ]
                                      }
                                    >
                                      <DefaultAvatar
                                        fullname={group.name}
                                        userAvatarWidth={"26px"}
                                        userAvatarHeight={"26px"}
                                        showAgentList={false}
                                        squareShaped
                                      />
                                      <div
                                        className={
                                          classes["list-item-wrapper__group-detail-wrapper__name"]
                                        }
                                      >
                                        {group.name}
                                      </div>
                                    </div>

                                    <input
                                      className={
                                        classes["group-list-wrapper__list-item-wrapper__checkbox"]
                                      }
                                      type="checkbox"
                                      name="group"
                                      data-value={group.name}
                                      value={group.id}
                                      onChange={(event) => onChangeGroupCheckboxHandler(event)}
                                      checked={group.checked}
                                    />
                                  </div>
                                </label>
                              );
                            })}
                        </div>
                        <div
                          className={
                            classes["group-wrapper__change-option-wrapper__button-wrapper"]
                          }
                        >
                          <button
                            className={classes["group-wrapper__button-wrapper__secondary-button"]}
                            onClick={onClickGroupMenuClear}
                          >
                            Clear
                          </button>
                          <button
                            className={classes["group-wrapper__button-wrapper__primary-button"]}
                            onClick={onClickUpdateAssignList}
                          >
                            Ok
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                </div>
                <div
                  className={
                    classes["view-ticket-information-wrapper__group-wrapper__change-option-btn"]
                  }
                  onClick={openGroupMenuHandler}
                >
                  Change
                </div>
              </div>
            </div>
          </div>
          <div className={classes["view-ticket-information-wrapper__agent-wrapper"]}>
            <div className={classes["view-ticket-information-wrapper__agent-wrapper__heading"]}>
              <div className={classes["view-ticket-information-wrapper__agent-wrapper__title"]}>
                Agent:
              </div>
              <div>
                <div className={classes["agent-wrapper__change-option-container"]}>
                  <>
                    <Backdrop
                      show={agentMenuOpen}
                      clicked={openAgentMenuHandler}
                      invisible
                      zIndex={10}
                    />
                    {agentMenuOpen && (
                      <div className={classes["agent-wrapper__change-option-wrapper"]}>
                        <div className={classes["agent-wrapper__change-option-wrapper__heading"]}>
                          <div className={classes["agent-wrapper__change-option-wrapper__title"]}>
                            Agent
                          </div>
                          <div
                            className={classes["agent-wrapper__change-option-wrapper__close-btn"]}
                            onClick={openAgentMenuHandler}
                          >
                            <FaTimes />
                          </div>
                        </div>
                        <div
                          className={
                            classes["agent-wrapper__change-option-wrapper__search-wrapper"]
                          }
                        >
                          <div
                            className={classes["my-tickets-options-wrapper__search-wrapper_icon"]}
                          >
                            <FaSearch />
                          </div>
                          <input
                            className={classes["agent-wrapper__change-option-wrapper__search"]}
                            placeholder="Search"
                            onChange={onChangeSearchAgentHandler}
                          ></input>
                        </div>
                        <div
                          className={`${
                            classes["agent-wrapper__change-option-wrapper__assigned-wrapper"]
                          } ${checkedAgentExist ? classes["active"] : ""}`}
                        >
                          {checkedAgentExist &&
                            agentMenuAssignList.map(
                              (checkedAgentValue: any, checkedAgentIndex: number) => {
                                if (checkedAgentIndex === maxAgentMenuAssign) {
                                  return (
                                    <DefaultAvatar
                                      key={checkedAgentIndex}
                                      fullname={checkedAgentValue.name}
                                      userAvatarWidth={"22px"}
                                      userAvatarHeight={"22px"}
                                      agentList={checkedAgentValue.name}
                                      showAgentList={true}
                                      moreThan={moreThanThreeAgent}
                                      ticketID={ticketData[0].ticketID}
                                    />
                                  );
                                } else if (
                                  checkedAgentIndex >= 0 &&
                                  checkedAgentIndex < maxAgentMenuAssign
                                ) {
                                  return (
                                    <DefaultAvatar
                                      key={checkedAgentIndex}
                                      fullname={checkedAgentValue.name}
                                      userAvatarWidth={"22px"}
                                      userAvatarHeight={"22px"}
                                      agentList={checkedAgentValue.name}
                                      showAgentList={true}
                                    />
                                  );
                                }
                              }
                            )}
                        </div>
                        <div
                          className={
                            classes["agent-wrapper__change-option-wrapper__agent-list-wrapper"]
                          }
                        >
                          {checkedAgentList
                            .filter((value: any) =>
                              value.name.toLowerCase().includes(searchAgent.toLowerCase())
                            )
                            .map((agent: any, agentIndex: number) => {
                              return (
                                <label key={agent.id + agentIndex}>
                                  <div
                                    className={
                                      classes[
                                        "change-option-wrapper__agent-list-wrapper__list-item-wrapper"
                                      ]
                                    }
                                  >
                                    <div
                                      className={
                                        classes[
                                          "agent-list-wrapper__list-item-wrapper__agent-detail-wrapper"
                                        ]
                                      }
                                    >
                                      <DefaultAvatar
                                        fullname={agent.name}
                                        userAvatarWidth={"26px"}
                                        userAvatarHeight={"26px"}
                                        showAgentList={false}
                                      />
                                      <div
                                        className={
                                          classes["list-item-wrapper__agent-detail-wrapper__name"]
                                        }
                                      >
                                        {agent.name}
                                      </div>
                                    </div>

                                    <input
                                      className={
                                        classes["agent-list-wrapper__list-item-wrapper__checkbox"]
                                      }
                                      type="checkbox"
                                      name="agent"
                                      data-value={agent.name}
                                      value={agent.id}
                                      onChange={(event) => onChangeAgentCheckboxHandler(event)}
                                      checked={agent.checked}
                                    />
                                  </div>
                                </label>
                              );
                            })}
                        </div>
                        <div
                          className={
                            classes["agent-wrapper__change-option-wrapper__button-wrapper"]
                          }
                        >
                          <button
                            className={classes["agent-wrapper__button-wrapper__secondary-button"]}
                            onClick={onClickAgentMenuClear}
                          >
                            Clear
                          </button>
                          <button
                            className={classes["agent-wrapper__button-wrapper__primary-button"]}
                            onClick={onClickUpdateAssignList}
                          >
                            Ok
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                </div>
                <div
                  className={
                    classes["view-ticket-information-wrapper__agent-wrapper__change-option-btn"]
                  }
                  onClick={openAgentMenuHandler}
                >
                  Change
                </div>
              </div>
            </div>
            <div className={classes["agent-wrapper__assigned-list"]}>
              {ticketData[0].agent && ticketData[0].agent.length > 0 ? (
                ticketData[0].agent.map((assignedList: any, assignedListIndex: number) => {
                  if (assignedListIndex === maxAgentAssign) {
                    return (
                      <DefaultAvatar
                        key={ticketData[0].ticketID + assignedList.id}
                        fullname={assignedList.name}
                        agentList={assignedList.name}
                        showAgentList={true}
                        moreThan={moreThanThreeAgent}
                        ticketID={ticketData[0].ticketID}
                      />
                    );
                  } else if (assignedListIndex >= 0 && assignedListIndex < maxAgentAssign) {
                    return (
                      <DefaultAvatar
                        key={ticketData[0].ticketID + assignedList.id}
                        fullname={assignedList.name}
                        agentList={assignedList.name}
                        showAgentList={true}
                      />
                    );
                  } else return null;
                })
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
  );
};

export default ViewTicket;
