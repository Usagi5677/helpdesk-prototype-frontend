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
import Site from "../../../models/Site";

const StatusCardWrapper = styled.div`
  width: 150px;
  min-height: 80px;
  background-color: white;
  border-radius: 20px;
  padding: 0px 15px;
  font-size: 14px;
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
`;
const StatusCardInfoWrapper = styled.div`
  text-align: right;
`;
const StatusCardAmount = styled.div`
  font-size: 16px;
  font-weight: 800;
`;
const StatusCardStatusName = styled.div`
  text-align: right;
`;
const StatusCard = ({
  status,
  amount,
  siteId,
}: {
  status: string;
  amount: number;
  siteId: number | null;
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let site: Site | null | undefined = null;
  if (siteId) {
    site = user?.siteAccess.adminOrAgent.find((site) => site.id === siteId);
  }

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
          `/${user?.isAdmin || user?.isAgent ? "all-tickets" : "my-tickets"}?${
            site ? `site=${site.code}&` : ""
          }status=${status}`
        )
      }
      className="dashboardCard"
      style={{ border: `1px solid ${color}` }}
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
