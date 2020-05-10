import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = styled.button`
  --size: 40px;
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  width: var(--size);
  height: var(--size);
  border-radius: calc(0.5 * var(--size));
  cursor: pointer;

  &:hover {
    background: var(--light-gray);
    svg {
      filter: brightness(0.8);
    }
  }

  &:active {
    background: var(--gray);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: gray;
`;

const IconButton = ({ icon, ...props }) => (
  <Button {...props}>
    <Icon icon={icon} />
  </Button>
);

export default IconButton;
