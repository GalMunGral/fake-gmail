import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faUserFriends,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const colorMap = {
  primary: "#f44336",
  social: "#2962ff",
  promotions: "#2e7d32",
};

const iconMap = {
  primary: faInbox,
  social: faUserFriends,
  promotions: faTag,
};

const Icon = styled(FontAwesomeIcon)`
  margin: 0 20px;
`;

const Tab = ({ className, name, active, ...props }) => {
  return (
    <div className={className} {...props}>
      <Icon icon={iconMap[name]} />
      {name}
    </div>
  );
};

const StyledTab = styled(Tab)`
  --height: 55px;
  display: inline-block;
  position: relative;
  height: var(--height);
  line-height: var(--height);
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: start;
  text-transform: capitalize;
  width: 250px;
  color: ${(props) => (props.active ? colorMap[props.name] : "gray")};
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
    background: ${(props) =>
      props.active ? colorMap[props.name] : "transparent"};
  }

  &:hover {
    background: var(--light-gray);
  }
`;

export default StyledTab;
