import styled from "styled-components";
import {
  FaEnvelopeOpen,
  FaEnvelopeOpenText,
  FaSpinner,
  FaCheck,
  FaBan,
} from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import { statusColors } from "../../../helpers/style";

const StatusCardWrapper = styled.div`
  width: 180px;
  min-height: 100px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5px 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 10px 5px;
`;
const StatusCardIcon = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.iconBackgroundColor
      ? props.iconBackgroundColor
      : "rgba(0, 183, 255, 0.2)"};
  color: ${(props) => (props.iconColor ? props.iconColor : "rgb(0, 183, 255)")};
  font-size: 1.5rem;
`;
const StatusCardInfoWrapper = styled.div`
  font-size: 1rem;
  text-align: right;
`;
const StatusCardAmount = styled.div`
  font-weight: 800;
`;
const StatusCardStatusName = styled.div`
  font-size: 1rem;
  text-align: right;
`;
const StatusCard = ({ status, amount }: { status: string; amount: number }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let icon = null;
  const [color, bgColor] = statusColors(status);
  if (status === "Pending") {
    icon = <FaSpinner />;
  } else if (status === "Open") {
    icon = <FaEnvelopeOpen />;
  } else if (status === "Closed") {
    icon = <FaBan />;
  } else if (status === "Solved") {
    icon = <FaCheck />;
  } else if (status === "Reopened") {
    icon = <FaEnvelopeOpenText />;
  }
  return (
    <StatusCardWrapper
      onClick={() =>
        navigate(
          `/${
            user?.isAdmin || user?.isAgent ? "all-tickets" : "my-tickets"
          }?status=${status}`
        )
      }
      className="dashboardCard"
    >
      <StatusCardIcon iconBackgroundColor={bgColor} iconColor={color}>
        {icon}
      </StatusCardIcon>
      <StatusCardInfoWrapper>
        <StatusCardStatusName>{status}</StatusCardStatusName>
        <StatusCardAmount>{amount}</StatusCardAmount>
      </StatusCardInfoWrapper>
    </StatusCardWrapper>
  );
};

export default StatusCard;
