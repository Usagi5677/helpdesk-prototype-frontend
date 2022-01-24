import styled from "styled-components";

const StatusTagWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25em 0.6em;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: 10rem;
  color: ${(props) => props.fontColor ? props.fontColor : "rgb(0, 183, 255)"};
  background-color: ${(props) => props.bgColor ? props.bgColor : "rgba(0, 183, 255, 0.2)"};
  cursor: pointer;
  transition: all 0.3s ease;
  @media (min-width: 600px) {
    min-width: 80px;
  }
  &:hover {
    background-color: ${(props) => props.bgHover ? props.bgHover : "rgb(0, 183, 255)"};
    color: ${(props) => props.fontHover ? props.fontHover : "cyan"};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const StatusTag = (props: any) => {
  return (
    <StatusTagWrapper bgColor={props.bgColor} fontColor={props.fontColor} bgHover={props.bgHover} fontHover={props.fontHover}>
        {props.name}
    </StatusTagWrapper>
  );
};

export default StatusTag;
