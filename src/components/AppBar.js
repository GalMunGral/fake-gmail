import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const Bar = styled.div`
  padding: 2px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--light-gray);
`;

const Button = styled.button`
  --size: 48px;
  border: none;
  width: var(--size);
  height: var(--size);
  border-radius: calc(0.5 * var(--size));
  margin: 5px;
  background: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background: var(--light-gray);
  }
`;

const Group = styled.section`
  flex: 0 0 auto;
  min-width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: var(--dark-gray);
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
`;

const SearchBar = styled.div`
  width: 50vw;
  height: calc(100% - 20px);
  padding: 5px;
  background: var(--light-gray);
  border-radius: 10px;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:focus-within {
    box-shadow: 0 1px 4px 0px var(--gray);
    background: white;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: var(--dark-gray);
  margin: 20px;
`;

const AppBar = ({ className, toggle }) => (
  <Bar className={className}>
    <Group>
      <Button onClick={toggle}>
        <Icon icon={faBars} />
      </Button>
      <Logo src={logo} alt="logo" />
    </Group>
    <SearchBar>
      <SearchIcon icon={faSearch} />
      <Input placeholder="Search mail" />
    </SearchBar>
    <Group />
  </Bar>
);

export default AppBar;
