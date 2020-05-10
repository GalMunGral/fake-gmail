import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ToolBar = styled.div`
  flex: 0 0 50px;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 10px;
  padding-right: 30px;
`;

const Scrollable = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding-bottom: 80px;
  &::-webkit-scrollbar-thumb {
    background: var(--gray);
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <ToolBar>{children[0]}</ToolBar>
      <Scrollable>{children[1]}</Scrollable>
    </Container>
  );
};

export default Layout;
