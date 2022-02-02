import { FaChevronDown, FaArrowLeft, FaTimes, FaSearch } from "react-icons/fa";
import { useParams } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import classes from "./ViewTicket.module.css";
import DefaultAvatar from "../../components/UI/DefaultAvatar/DefaultAvatar";
import { MyTicketData } from "../MyTickets/MyTicketsData";
import { useEffect, useState } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const groupList = [
  { id: "G1", name: "Software" },
  { id: "G2", name: "AGroup A" },
  { id: "G3", name: "BGroup B" },
  { id: "G4", name: "CGroup C" },
  { id: "G5", name: "DGroup D" },
];
const options2 = [
  { value: "0", label: "Unassigned" },
  { value: "1", label: "Person 1" },
  { value: "2", label: "Person 2" },
  { value: "3", label: "Person 3" },
  { value: "4", label: "Person 4" },
];
const animatedComponents = makeAnimated();

const ViewTicket = (props: any) => {
  const { ticketID } = useParams();
  const [checkedList, setCheckedList] = useState<any>([]);
  const [searchUser, setSearchUser] = useState("");
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);

  let ticketData = MyTicketData.filter((ticket) => {
    return ticket.ticketID === ticketID;
  });

  useEffect(() => {
    let newListOfUsers = groupList.slice();

    setCheckedList(
      newListOfUsers.map((newListofUser) => {
        return {
          ...newListofUser,
          checked: !!ticketData[0].group?.find(function (value) {
            return value.id === newListofUser.id;
          }),
        };
      })
    );

    //let groupID: any = ticketData[0].group?.[1]?.id;
    //let groupLength: any = ticketData[0].group?.length;
  }, []);

  console.log("checkedlist");
  console.log(checkedList);

  const onClickCheckboxHandler = (event: any) => {
    //let tempArray = [];
    //if (event.target.checked) {
    //  tempArray = assignedList.filter((checkbox: any) => checkbox.id !== event.target.value);
    //  tempArray.push({ id: event.target.value, name: event.target.dataset.value });
    //}else{

    //}
    let id = event.target.value;
    console.log("inside onclick");
    console.log(checkedList);
    let newCheckedLists = [...checkedList];

    setCheckedList(
      newCheckedLists.map((newCheckedList) =>
        newCheckedList.id === id
          ? { ...newCheckedList, checked: event.target.checked }
          : newCheckedList
      )
    );

    //}
    //setCheckedList(tempArray);
  };
  console.log("checklist");
  console.log(checkedList);
  const onChangeSearchUserHandler = (event: any) => {
    setSearchUser(event.target.value);
  };

  let checkedExist;
  for (let index = 0; index < checkedList.length; index++) {
    if (checkedList[index].checked === true) {
      checkedExist = true;
    }
  }

  console.log("group");
  console.log(ticketData[0].group);
  const onClickUpdateAssignList = () => {
    let assignedListArray: any = [];
    for (let index = 0; index < checkedList.length; index++) {
      if (checkedList[index].checked === true) {
        assignedListArray.push({ id: checkedList[index].id, name: checkedList[index].name });
      }
    }
    ticketData[0].group = assignedListArray;
    setGroupMenuOpen(!groupMenuOpen);
    console.log(ticketData[0].group);
  };

  const openGroupMenuHandler = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };

  let moreThanThreeAssign: any;
  let groupLength: any = ticketData[0].group?.length;
  if (groupLength > 2) {
    moreThanThreeAssign = ticketData[0].group?.slice(3, groupLength);
  }

  console.log("morethanThree");
  console.log(moreThanThreeAssign);

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
              <div
                className={
                  classes["view-ticket-information-wrapper__group-wrapper__change-option-btn"]
                }
                onClick={openGroupMenuHandler}
              >
                Change
              </div>
              <div className={classes["group-wrapper__change-option-container"]}>
                <>
                  <Backdrop show={groupMenuOpen} clicked={openGroupMenuHandler} invisible />
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
                        className={classes["group-wrapper__change-option-wrapper__search-wrapper"]}
                      >
                        <div className={classes["my-tickets-options-wrapper__search-wrapper_icon"]}>
                          <FaSearch />
                        </div>
                        <input
                          className={classes["group-wrapper__change-option-wrapper__search"]}
                          placeholder="Search"
                          onChange={onChangeSearchUserHandler}
                        ></input>
                      </div>
                      <div
                        className={`${
                          classes["group-wrapper__change-option-wrapper__assigned-wrapper"]
                        } ${checkedExist ? classes["active"] : ""}`}
                      >
                        {checkedExist &&
                          checkedList.map((checkedListValue: any, checkedListIndex: number) => {
                            if (checkedListValue.checked) {
                              return (
                                <DefaultAvatar
                                  key={checkedListIndex}
                                  fullname={checkedListValue.name}
                                  userAvatarWidth={"22px"}
                                  userAvatarHeight={"22px"}
                                  showAgentList={false}
                                />
                              );
                            }
                          })}
                      </div>
                      <div
                        className={
                          classes["group-wrapper__change-option-wrapper__group-list-wrapper"]
                        }
                      >
                        {checkedList
                          .filter((value: any) =>
                            value.name.toLowerCase().includes(searchUser.toLowerCase())
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
                                    onChange={(event) => onClickCheckboxHandler(event)}
                                    checked={group.checked}
                                  />
                                </div>
                              </label>
                            );
                          })}
                      </div>
                      <div
                        className={classes["group-wrapper__change-option-wrapper__button-wrapper"]}
                      >
                        <button
                          className={classes["group-wrapper__button-wrapper__secondary-button"]}
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
            </div>
            <div className={classes["group-wrapper__assigned-list"]}>
              {ticketData[0].group && ticketData[0].group.length > 0 ? (
                ticketData[0].group.map((assignedList: any, assignedListIndex: number) => {
                  if (assignedListIndex === 3) {
                    return (
                      <DefaultAvatar
                        key={ticketData[0].ticketID + assignedList.id}
                        fullname={assignedList.name}
                        agentList={assignedList.name}
                        showAgentList={true}
                        moreThan={moreThanThreeAssign}
                        ticketID={ticketData[0].ticketID}
                      />
                    );
                  } else if (assignedListIndex >= 0 && assignedListIndex < 3) {
                    return (
                      <DefaultAvatar
                        key={ticketData[0].ticketID + assignedList.id}
                        fullname={assignedList.name}
                        agentList={assignedList.name}
                        showAgentList={true}
                      />
                    );
                  }
                })
              ) : (
                <div>Unassigned</div>
              )}
            </div>
          </div>
          <div className={classes["view-ticket-information-wrapper__assign-wrapper"]}>
            <div className={classes["view-ticket-information-wrapper__assign-wrapper__title"]}>
              Agent:
            </div>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options2}
            />
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
