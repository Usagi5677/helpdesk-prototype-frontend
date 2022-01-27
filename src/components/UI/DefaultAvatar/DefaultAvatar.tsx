import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
const DefaultAvatarAssignList = styled.div<any>`
  background-color: white;
  position: absolute;
  min-width: 100px;
  border: 1px solid #ccc;
  z-index: 3;
  top: 40px;
  left: -70px;
  padding: 0 10px;
  margin-right: 209px;
  visibility: hidden;
`;

const DefaultAvatarWrapper = styled.div<any>`
  width: ${(props) => (props.userAvatarWidth ? props.userAvatarWidth : "30px")};
  height: ${(props) => (props.userAvatarHeight ? props.userAvatarHeight : "30px")};
  border-radius: 50%;
  background-color: ${(props) => props.colors[props.randomValue].backgroundColor};
  color: ${(props) => props.colors[props.randomValue].color};
  margin-right: 2px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover ${DefaultAvatarAssignList} {
    visibility: visible;
  }
`;

const DefaultAvatar = (props: any) => {
  const min = 0;
  const max = 2;
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min);

  const colors = [
    { backgroundColor: "rgb(241, 247, 237)", color: "rgb(36, 62, 54)" },
    { backgroundColor: "rgb(147, 168, 172)", color: "rgb(76, 87, 96)" },
    { backgroundColor: "rgb(164, 158, 141)", color: "rgb(80, 65, 54)" },
    { backgroundColor: "rgb(217, 184, 196)", color: "rgb(149, 113, 134)" },
  ];

  let initials;
  if (props.name) {
    initials = props.name
      .match(/^\w|\b\w(?=\S+$)/g)
      .join()
      .replace(",", "")
      .toUpperCase();
  }

  return (
    <DefaultAvatarWrapper
      colors={colors}
      randomValue={randomValue}
      userAvatarWidth={props.userAvatarWidth}
      userAvatarHeight={props.userAvatarHeight}
    >
      {props.moreThanThree && props.moreThanThree.length > 1 ? (
        <FaPlus />
      ) : props.userAvatar ? (
        <img src={props.userAvatar} alt="" style={{ borderRadius: "50%" }} />
      ) : (
        initials
      )}
      {props.showAgentList ? (
        <DefaultAvatarAssignList>
          {props.moreThanThree && props.moreThanThree.length > 1
            ? props.moreThanThree.map((agentValue: any, index: number) => {
                return <div key={props.ticketID + index}>{agentValue}</div>;
              })
            : props.agentList}
        </DefaultAvatarAssignList>
      ) : null}
    </DefaultAvatarWrapper>
  );
};

export default DefaultAvatar;
