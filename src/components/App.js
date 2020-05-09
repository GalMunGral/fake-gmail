import React from "react";
import styled from "styled-components";
import { Router, Redirect } from "@reach/router";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import Mailbox from "./Mailbox";
import { withEditor, withSelection, withStore } from "../contexts";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template:
    "a a" 60px
    "b c" calc(100vh - 60px) / 300px 1fr;
`;
const StyledAppBar = styled(AppBar)`
  grid-area: a;
`;
const StyledSideBar = styled(SideBar)`
  grid-area: b;
`;
const StyledMailbox = styled(Mailbox)`
  grid-area: c;
`;

const App = ({ folder }) => {
  return /(inbox|sent|drafts|trash)$/.test(folder) ? (
    <Container>
      <StyledAppBar />
      <StyledSideBar />
      <StyledMailbox />
    </Container>
  ) : (
    <Redirect to="/inbox" noThrow />
  );
};

const RoutedApp = () => (
  <Router>
    <App path=":folder" />
  </Router>
);

export default withStore(withSelection(withEditor(RoutedApp)));
