import styled from "styled-components";

const colorMap = {
  primary: "#f44336",
  social: "#2962ff",
  promotions: "#2e7d32",
};

const Tab = styled.div`
  --height: 55px;
  display: inline-block;
  position: relative;
  height: var(--height);
  line-height: var(--height);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  width: 250px;
  color: ${(props) => (props.active ? colorMap[props.name] : "var(--gray)")};
  cursor: pointer;
  transition: background 0.02s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: 0;
    border-radius: 3px 3px 0 0;
    width: 90%;
    height: 3px;
    background: ${(props) => (props.active ? props.color : "transparent")};
  }

  &:hover {
    background: #eeeeee;
  }
`;

export default Tab;
