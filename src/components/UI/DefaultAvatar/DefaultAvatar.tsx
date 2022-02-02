import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const DefaultAvatarAssignList = styled.div<any>`
  background-color: white;
  position: absolute;
  min-width: 120px;
  border: 1px solid #ccc;
  z-index: 3;
  top: 32px;
  left: -70px;
  padding: 0 10px;
  margin-right: 209px;
  visibility: hidden;
  color: initial;
`;

const DefaultAvatarWrapper = styled.div<any>`
  width: ${(props) => (props.userAvatarWidth ? props.userAvatarWidth : "30px")};
  height: ${(props) => (props.userAvatarHeight ? props.userAvatarHeight : "30px")};
  border-radius: ${(props) => (props.squareShaped ? "6px" : "50%")};
  background-color: ${(props) => props.colors[props.colorValue].backgroundColor};
  color: ${(props) => props.colors[props.colorValue].color};
  margin-right: ${(props) => (props.fromSiderBar ? "0" : "2px")};
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  &:hover ${DefaultAvatarAssignList} {
    visibility: visible;
  }
`;

const DefaultAvatar = (props: any) => {
  //const [randomValue, setRandomValue] = useState(0);
  let colorValue;

  /*
  useEffect(() => {
    const min = 0;
    const max = 2;
    setRandomValue(Math.floor(Math.random() * (max - min + 1) + min));
  }, []);
  */

  const colors = [
    { backgroundColor: "rgb(170, 71, 188)", color: "rgb(255, 255, 255)" }, //0
    { backgroundColor: "rgb(122, 31, 162)", color: "rgb(255, 255, 255)" }, //1
    { backgroundColor: "rgb(120, 144, 156)", color: "rgb(255, 255, 255)" }, //2
    { backgroundColor: "rgb(70, 90, 101)", color: "rgb(255, 255, 255)" }, //3
    { backgroundColor: "rgb(236, 64, 122)", color: "rgb(255, 255, 255)" }, //4
    { backgroundColor: "rgb(194, 23, 91)", color: "rgb(255, 255, 255)" }, //5
    { backgroundColor: "rgb(92, 107, 192)", color: "rgb(255, 255, 255)" }, //6
    { backgroundColor: "rgb(2, 136, 209)", color: "rgb(255, 255, 255)" }, //7
    { backgroundColor: "rgb(0, 87, 156)", color: "rgb(255, 255, 255)" }, //8
    { backgroundColor: "rgb(0, 152, 166)", color: "rgb(255, 255, 255)" }, //9
    { backgroundColor: "rgb(0, 76, 63)", color: "rgb(255, 255, 255)" }, //10
    { backgroundColor: "rgb(104, 159, 57)", color: "rgb(255, 255, 255)" }, //11
    { backgroundColor: "rgb(51, 105, 30)", color: "rgb(255, 255, 255)" }, //12
    { backgroundColor: "rgb(140, 110, 99)", color: "rgb(255, 255, 255)" }, //13
    { backgroundColor: "rgb(93, 64, 56)", color: "rgb(255, 255, 255)" }, //14
    { backgroundColor: "rgb(126, 87, 194)", color: "rgb(255, 255, 255)" }, //15
    { backgroundColor: "rgb(81, 45, 167)", color: "rgb(255, 255, 255)" }, //16
    { backgroundColor: "rgb(239, 108, 0)", color: "rgb(160, 202, 146)" }, //17
    { backgroundColor: "rgb(245, 81, 30)", color: "rgb(255, 255, 255)" }, //18
    { backgroundColor: "rgb(191, 54, 12)", color: "rgb(255, 255, 255)" }, //19
    { backgroundColor: "rgb(0, 167, 225)", color: "rgb(255, 255, 255)" }, //20
    { backgroundColor: "rgb(179, 0, 27)", color: "rgb(255, 255, 255" }, //21
    { backgroundColor: "rgb(20, 49, 9)", color: "rgb(255, 255, 255)" }, //22
    { backgroundColor: "rgb(255, 16, 83)", color: "rgb(255, 255, 255)" }, //23
    { backgroundColor: "rgb(157, 68, 181)", color: "rgb(255, 255, 255)" }, //24
    { backgroundColor: "rgb(110, 68, 255)", color: "rgb(255, 255, 255)" }, //25
    { backgroundColor: "rgb(31, 32, 65)", color: "rgb(255, 255, 255)" }, //26
  ];

  let initials;

  if (props.fullname) {
    initials = props.fullname
      .match(/^\w|\b\w(?=\S+$)/g)
      .join()
      .replace(",", "")
      .toUpperCase();
  }

  if (initials !== undefined) {
    switch (initials.charAt(0)) {
      case "A":
        colorValue = 0;
        break;
      case "B":
        colorValue = 1;
        break;
      case "C":
        colorValue = 2;
        break;
      case "D":
        colorValue = 3;
        break;
      case "E":
        colorValue = 4;
        break;
      case "F":
        colorValue = 5;
        break;
      case "G":
        colorValue = 6;
        break;
      case "H":
        colorValue = 7;
        break;
      case "I":
        colorValue = 8;
        break;
      case "J":
        colorValue = 9;
        break;
      case "K":
        colorValue = 10;
        break;
      case "L":
        colorValue = 11;
        break;
      case "M":
        colorValue = 12;
        break;
      case "N":
        colorValue = 13;
        break;
      case "O":
        colorValue = 14;
        break;
      case "P":
        colorValue = 15;
        break;
      case "Q":
        colorValue = 16;
        break;
      case "R":
        colorValue = 17;
        break;
      case "S":
        colorValue = 18;
        break;
      case "T":
        colorValue = 19;
        break;
      case "U":
        colorValue = 20;
        break;
      case "V":
        colorValue = 21;
        break;
      case "W":
        colorValue = 22;
        break;
      case "X":
        colorValue = 23;
        break;
      case "Y":
        colorValue = 24;
        break;
      case "Z":
        colorValue = 25;
        break;
      default:
        colorValue = 26;
        break;
    }
  } else {
    colorValue = 26;
  }

  return (
    <DefaultAvatarWrapper
      colors={colors}
      colorValue={colorValue}
      userAvatarWidth={props.userAvatarWidth}
      userAvatarHeight={props.userAvatarHeight}
      fromSiderBar={props.fromSiderBar}
      squareShaped={props.squareShaped}
    >
      {props.moreThan && props.moreThan.length > 0 ? (
        <FaPlus />
      ) : props.userAvatar ? (
        <img src={props.userAvatar} alt="" style={{ borderRadius: "50%" }} />
      ) : (
        initials
      )}
      {props.showAgentList ? (
        <DefaultAvatarAssignList>
          {props.moreThan && props.moreThan.length > 0
            ? props.moreThan.map((agentValue: any, index: number) => {
                return <div key={props.ticketID + index}>{agentValue.name}</div>;
              })
            : props.agentList}
        </DefaultAvatarAssignList>
      ) : null}
    </DefaultAvatarWrapper>
  );
};

export default DefaultAvatar;
