import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "@reach/router";
import { StoreContext, SelectionContext, EditorContext } from "../contexts";
import createIcon from "../assets/create.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faPaperPlane,
  faScroll,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Menu = styled.div`
  background: white;
  overflow: hidden;
  width: ${({ collapsed }) => (collapsed ? 72 : 250)}px;
  display: flex;
  flex-direction: column;
  align-items: ${({ collapsed }) => (collapsed ? "center" : "start")};
`;

const Icon = styled.img`
  --size: 32px;
  width: var(--size);
  height: var(--size);
`;

const Button = styled.button`
  --size: 50px;
  width: ${({ collapsed }) => (collapsed ? "var(--size)" : "150px")};
  height: var(--size);
  margin: 15px 10px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  border-radius: calc(0.5 * var(--size));
  box-shadow: 0 1px 3px 1px var(--gray);
  transition: width 0.2s;
  font-family: inherit;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 5px 10px 0 var(--gray);
  }

  &:active {
    background: var(--light-gray);
  }
`;

const ButtonText = styled.span`
  margin-left: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark-gray);
`;

const LinkWrapper = ({
  className,
  to,
  collapsed,
  hovered,
  activated,
  children,
  ...props
}) => (
  <Link to={to} className={className} {...props}>
    {children}
  </Link>
);

const MenuItem = styled(LinkWrapper)`
  --size: 35px;
  height: var(--size);
  width: ${({ collapsed }) => (collapsed ? "var(--size)" : "80%")};
  padding: 0 ${({ collapsed }) => (collapsed ? "0" : "10px")};
  margin: 0 ${({ collapsed }) => (collapsed ? "10px" : "0")};
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? "center" : "start")};
  border-top-right-radius: calc(0.5 * var(--size));
  border-bottom-right-radius: calc(0.5 * var(--size));
  border-top-left-radius: ${({ collapsed }) =>
    collapsed ? "calc(0.5 * var(--size))" : "0"};
  border-bottom-left-radius: ${({ collapsed }) =>
    collapsed ? "calc(0.5 * var(--size))" : "0"};
  background: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${({ activated }) => (activated ? "700" : "600")};
  color: ${({ activated }) => (activated ? "var(--theme)" : "gray")};
  background: ${({ activated }) =>
    activated ? "var(--theme-light)" : "white"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ activated }) =>
      activated ? "var(--theme-light)" : "var(--light-gray)"};
  }

  &:active {
    background: ${({ activated }) =>
      activated ? "var(--theme-light)" : "var(--gray)"};
  }

  & > svg {
    width: 20px;
    margin: 0 ${({ collapsed }) => (collapsed ? "0" : "20px")};
    color: inherit;
  }
`;

const SideBar = ({ className, collapsed, setCollapse }) => {
  const { folder } = useParams();
  const { dispatch, T } = useContext(StoreContext);
  const [selected, setSelected] = useContext(SelectionContext);
  const { createDraft, editing, open } = useContext(EditorContext);
  const [hovered, setHovered] = useState(false);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  const deleteAll = () => {
    dispatch((d) => {
      setTimeout(() => {
        d({
          type: T.DELETE_SELECTED,
          payload: { folder, selected },
        });
        setSelected([]);
      }, 200);
    });
  };

  return (
    <Menu
      className={className}
      collapsed={collapsed && !hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button
        collapsed={collapsed && !hovered}
        onClick={() => {
          if (!editing) {
            createDraft();
            open();
          }
        }}
      >
        <Icon src={createIcon} />
        {(!collapsed || hovered) && <ButtonText>Compose</ButtonText>}
      </Button>
      <MenuItem
        to="/inbox/all"
        collapsed={collapsed && !hovered}
        activated={folder === "inbox"}
      >
        <FontAwesomeIcon icon={faInbox} fixedWidth />
        {(!collapsed || hovered) && "Inbox"}
      </MenuItem>
      <MenuItem
        to="/sent/all"
        collapsed={collapsed && !hovered}
        activated={folder === "sent"}
      >
        <FontAwesomeIcon icon={faPaperPlane} fixedWidth />
        {(!collapsed || hovered) && "Sent"}
      </MenuItem>
      <MenuItem
        to="/drafts/all"
        collapsed={collapsed && !hovered}
        activated={folder === "drafts"}
      >
        <FontAwesomeIcon icon={faScroll} fixedWidth />
        {(!collapsed || hovered) && "Drafts"}
      </MenuItem>
      <MenuItem
        to="/trash/all"
        collapsed={collapsed && !hovered}
        activated={folder === "trash"}
        style={{
          background: dropZoneActive ? "var(--theme)" : "",
          color: dropZoneActive ? "white" : "",
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={() => {
          setDropZoneActive(false);
        }}
        onDrop={() => {
          deleteAll();
          setDropZoneActive(false);
        }}
      >
        <FontAwesomeIcon icon={faTrash} fixedWidth />
        {(!collapsed || hovered) && "Trash"}
      </MenuItem>
    </Menu>
  );
};

export default SideBar;
