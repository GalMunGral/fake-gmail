import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import _ from "lodash";
import { StoreContext, EditorContext, SelectionContext } from "../contexts";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";
import { useParams, useNavigate } from "@reach/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
  cursor: pointer;

  &:hover &:active {
    cursor: grabbing;
  }

  &:hover {
    background: ${({ selected }) => (selected ? "var(--highlight)" : "white")};
    filter: brightness(0.95);

    & * {
      visibility: visible;
    }
  }
`;

const SenderInfo = styled.div`
  flex: 0 0 200px;
  font-weight: 600;
`;

const Summary = styled.div`
  flex: 1 1 auto;
`;

const Subject = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

const Preheader = styled.span`
  font-weight: 300;
  color: gray;
`;

const Actions = styled.div`
  margin-right: 30px;
  flex: 0 0 auto;
  visibility: hidden;
  color: var(--gray);
`;

const format = (length) => (s) => {
  if (s.length <= length) return s;
  return s.slice(0, length) + "...";
};

let timer;

const Item = ({ item, selected, toggleItem, setCoordinates, setDragging }) => {
  const { id, senderName, senderEmail, subject, content } = item;
  const { dispatch, T } = useContext(StoreContext);
  const [, setSelected] = useContext(SelectionContext);
  const { folder } = useParams();
  const navigate = useNavigate();
  const { replaceDraft, setEditing } = useContext(EditorContext);

  const moveDragImage = useCallback(
    _.throttle((x, y) => {
      setCoordinates([x, y]);
      setDragging(true);
    }),
    []
  );

  const onDrag = (e) => {
    const OFFSET = 15;
    moveDragImage(e.clientX - OFFSET, e.clientY - OFFSET);
  };

  const onDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const deleteItem = () => {
    dispatch((d) => {
      setTimeout(() => {
        d({
          type: T.DELETE,
          payload: { folder, id },
        });
      }, 200);
    });
  };

  const onMouseDown = (e) => {
    timer = setTimeout(() => {
      toggleItem(item, true);
      timer = null;
    }, 300);
  };

  const onMouseUp = (e) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      if (folder === "drafts") {
        replaceDraft(item);
        setEditing(true);
      } else {
        setSelected([]);
        navigate(`/${folder}/${item.id}`);
      }
    }
  };

  return (
    <Row
      draggable={folder !== "trash"}
      selected={selected}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {folder !== "trash" && (
        <Checkbox
          checked={selected}
          onChange={() => toggleItem(item, !selected)}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
        />
      )}
      <SenderInfo>{senderName || senderEmail || "(no name)"}</SenderInfo>
      <Summary>
        <Subject>{format(30)(subject) || "(empty)"}</Subject>
        <Preheader>
          &nbsp;&mdash;&nbsp;{format(50)(content) || "(empty)"}
        </Preheader>
      </Summary>
      {folder !== "trash" && (
        <Actions>
          <IconButton
            icon={faTrash}
            onClick={deleteItem}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          />
        </Actions>
      )}
    </Row>
  );
};

export default React.memo(Item);
