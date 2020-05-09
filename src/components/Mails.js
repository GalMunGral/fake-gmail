import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "./Item";
import useItemSelection from "../hooks/itemSelection";

const DragImage = styled.div`
  position: fixed;
  background: var(--highlight);
  top: 0;
  left: 0;
  width: 200px;
  height: 60px;
  pointer-events: none;
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
          selected={selected.includes(mail)}
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
        Move {selected.length} Items
      </DragImage>
    </>
  );
};

export default Mails;
