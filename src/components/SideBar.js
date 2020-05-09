import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useParams } from "@reach/router";
import { StoreContext, SelectionContext, EditorContext } from "../contexts";
import NewMessage from "./NewMessage";

const Div = styled.div`
  background: white;
`;

const Button = styled.button``;

const SideBar = ({ className }) => {
  const { folder } = useParams();
  const { dispatch, T } = useContext(StoreContext);
  const [selected, setSelected] = useContext(SelectionContext);
  const { createDraft, editing, open } = useContext(EditorContext);

  return (
    <Div className={className}>
      <Button
        onClick={() => {
          if (!editing) {
            createDraft();
            open();
          }
        }}
      >
        Compose
      </Button>
      {editing && <NewMessage />}
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
              dispatch({
                type: T.DELETE_SELECTED,
                payload: { folder, selected },
              });
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
