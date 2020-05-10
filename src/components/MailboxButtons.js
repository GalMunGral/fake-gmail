import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";
import Space from "./Space";
import { useParams } from "@reach/router";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Progress = styled.div`
  flex: 0 0 150px;
  text-align: end;
`;

const Span = styled.span`
  font-size: 0.9rem;
  color: gray;
  margin: 0 20px;
`;

const MailboxButtons = ({
  start,
  end,
  total,
  prevPage,
  nextPage,
  allSelected,
  toggleAll,
}) => {
  const { folder } = useParams();
  return (
    <>
      {folder !== "trash" && (
        <Checkbox checked={allSelected} onChange={toggleAll} />
      )}
      <Space />
      <Progress>
        <Span>
          {start}&ndash;{end} of {total}
        </Span>
      </Progress>
      <IconButton onClick={prevPage} icon={faAngleLeft} />
      <IconButton onClick={nextPage} icon={faAngleRight} />
    </>
  );
};

export default MailboxButtons;
