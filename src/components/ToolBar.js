import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import { useParams } from "@reach/router";

const Group = styled.div`
  flex: 0 0 auto;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.div`
  flex: 0 0 150px;
  text-align: end;
`;

const ToolBar = ({
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
    <Group>
      {folder !== "trash" && (
        <Checkbox checked={allSelected} onChange={toggleAll} />
      )}
      <Progress>
        {start}-{end}/{total}
      </Progress>
      <button onClick={prevPage}>&lt;</button>
      <button onClick={nextPage}>&gt;</button>
    </Group>
  );
};

export default ToolBar;
