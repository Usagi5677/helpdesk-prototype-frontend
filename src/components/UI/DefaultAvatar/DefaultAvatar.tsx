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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.colors[props.randomValue].backgroundColor};
  color: ${(props) => props.colors[props.randomValue].color};;
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
    { backgroundColor: "rgb(219, 50, 77)", color: "rgb(166, 38, 57)" },
    { backgroundColor: "rgb(147, 168, 172)", color: "rgb(76, 87, 96)" },
    { backgroundColor: "rgb(164, 158, 141)", color: "rgb(80, 65, 54)" },
  ];

  const initials = props.name
    .match(/^\w|\b\w(?=\S+$)/g)
    .join()
    .replace(",", "");

  return (
    <DefaultAvatarWrapper colors={colors} randomValue={randomValue}>
      {props.moreThanThree && props.moreThanThree.length > 1 ? <FaPlus /> : initials}
      <DefaultAvatarAssignList >
        {props.moreThanThree && props.moreThanThree.length > 1
          ? props.moreThanThree.map((agentValue: any, index: number) => {
              return <div key={props.ticketID + index}>{agentValue}</div>;
            })
          : props.agentList}
      </DefaultAvatarAssignList>
    </DefaultAvatarWrapper>
  );
};

export default DefaultAvatar;
