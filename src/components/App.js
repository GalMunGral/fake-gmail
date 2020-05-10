import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Router, Redirect } from "@reach/router";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import Mailbox from "./Mailbox";
import Detail from "./Detail";
import NewMessage from "./NewMessage";
import {
  withEditor,
  withSelection,
  withStore,
  EditorContext,
} from "../contexts";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template:
    "a a" 64px
    "b c" calc(100vh - 60px) / auto 1fr;
`;
const StyledAppBar = styled(AppBar)`
  grid-area: a;
`;
const StyledSideBar = styled(SideBar)`
  grid-area: b;
  transition: width 0.05s ease-out;
`;
const StyledMailbox = styled(Mailbox)`
  grid-area: c;
`;

const App = ({ folder, id }) => {
  const { editing } = useContext(EditorContext);
  const [collapsed, setCollapse] = useState(false);
  const toggleSideBar = () => setCollapse(!collapsed);

  return /(inbox|sent|drafts|trash)/.test(folder) ? (
    <Container>
      <StyledAppBar toggle={toggleSideBar} />
      <StyledSideBar collapsed={collapsed} setCollapse={setCollapse} />
      {id === "all" ? <StyledMailbox /> : <Detail />}
      {editing && <NewMessage />}
    </Container>
  ) : (
    <Redirect to="/inbox/all" noThrow />
  );
};

const RoutedApp = () => (
  <Router>
    <App path=":folder/:id" />
    <Redirect from="/" to="/inbox/all" noThrow />
  </Router>
);

export default withStore(withSelection(withEditor(RoutedApp)));
