import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { StoreContext, SelectionContext } from "./App";

const Div = styled.div`
  background: white;
`;

const Button = styled.button``;

const SideBar = ({ className, open }) => {
  const { dispatch, T } = useContext(StoreContext);
  const [selected, setSelected] = useContext(SelectionContext);

  return (
    <Div className={className}>
      <Button onClick={open}>Compose</Button>
      <ul>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
        <li>
          <Link to="/drafts">Drafts</Link>
        </li>
        <li
          style={{ background: "red", height: 300 }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={() => {
            window.setTimeout(() => {
              dispatch({ type: T.DELETE_SELECTED, payload: selected });
              setSelected([]);
            });
          }}
        >
          <Link to="/trash">Trash</Link>
        </li>
      </ul>
    </Div>
  );
};

export default SideBar;
