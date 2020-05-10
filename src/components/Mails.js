import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "./Item";
import useItemSelection from "../hooks/itemSelection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

const DragImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: white;
  font-weight: bold;
  background: var(--blue);
  border-radius: 5px;
  box-shadow: 0 1px 15px 0 gray;
  pointer-events: none;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 15px;
`;

const Mails = ({ mails }) => {
  const [[x, y], setCoordinates] = useState([0, 0]);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, toggleItem] = useItemSelection();

  useEffect(() => {
    setVisible(dragging);
  }, [dragging]);

  return (
    <>
      {mails.map((mail) => (
        <Item
          key={mail.id}
          item={mail}
          selected={selected.includes(mail.id)}
          toggleItem={toggleItem}
          setCoordinates={setCoordinates}
          setDragging={setDragging}
        />
      ))}
      <DragImage
        id="test"
        style={{
          visibility: visible ? "visible" : "hidden",
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
      >
        <Icon icon={faMailBulk} />
        Move {selected.length} {selected.length > 1 ? "items" : "item"}
      </DragImage>
    </>
  );
};

export default Mails;
