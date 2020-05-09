import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { StoreContext } from "./App";
import Checkbox from "./Checkbox";
import _ from "lodash";
import { useParams } from "@reach/router";

const Row = styled.div`
  --height: 40px;
  position: relative;
  height: var(--height);
  line-height: var(--height);
  padding: 0 10px;
  display: flex;
  border-bottom: 1px solid var(--light-gray);
  background-color: ${({ selected }) =>
    selected ? "var(--highlight)" : "white"};
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${({ selected }) => (selected ? "var(--highlight)" : "white")};
    filter: brightness(0.9);
  }
`;

const From = styled.div`
  flex: 0 0 200px;
  font-weight: bold;
`;

const Summary = styled.div`
  flex: 1 1 auto;
`;

const Subject = styled.span`
  font-weight: bold;
`;

const Preheader = styled.span`
  font-style: italic;
`;

const Actions = styled.div`
  flex: 0 0 auto;
`;

const Button = styled.button`
  background: var(--gray);
`;

const format = (length) => (s) => {
  if (s.length <= length) return s;
  return s.slice(0, length) + "...";
};

let timer;

const Item = ({ item, selected, toggleItem, setCoordinates, setDragging }) => {
  const { id, senderName, subject, content } = item;
  const { dispatch, T } = useContext(StoreContext);
  const { folder } = useParams();

  const moveDragImage = useCallback(
    _.throttle((x, y) => {
      setCoordinates([x, y]);
      setDragging(true);
    }),
    [setCoordinates]
  );

  const onDrag = (e) => {
    moveDragImage(e.clientX - 50, e.clientY - 25);
  };

  const onDragStart = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const deleteItem = () => {
    dispatch({
      type: T.DELETE,
      payload: { id },
    });
  };

  const onMouseDown = () => {
    timer = setTimeout(() => {
      toggleItem(item, true);
    }, 500);
  };

  const onMouseUp = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return (
    <Row
      draggable={folder === "inbox"}
      selected={selected}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Checkbox
        checked={selected}
        onChange={() => toggleItem(item, !selected)}
      />
      <From>{senderName}</From>
      <Summary>
        <Subject>{format(20)(subject)}</Subject>
        &nbsp;
        <Preheader>{format(60)(content)}</Preheader>
      </Summary>
      <Actions>
        <Button onClick={deleteItem}>DELETE</Button>
        <Button>Mark as Read</Button>
      </Actions>
    </Row>
  );
};

export default React.memo(Item);
