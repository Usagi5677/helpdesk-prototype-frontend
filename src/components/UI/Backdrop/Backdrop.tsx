import styled from "styled-components";

const BackdropContainer = styled.div<any>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: ${(props) => (props.zIndex ? props.zIndex : 100)};
  left: 0;
  top: 0;
  background-color: ${(props) => (props.invisible ? "" : "rgba(0, 0, 0, 0.2)")};
`;

const Backdrop = (props: any) => {
  return props.show ? (
    <BackdropContainer
      onClick={props.clicked}
      invisible={props.invisible}
      zIndex={props.zIndex}
    />
  ) : null;
};

export default Backdrop;
