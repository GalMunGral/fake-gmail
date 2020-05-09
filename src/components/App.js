import React, { useState } from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import Mailbox from "./Mailbox";
import NewMessage from "./NewMessage";
import useToggle from "../hooks/toggle";
import useMailbox from "../hooks/mailbox";

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
const StyledRouter = styled(Router)`
  grid-area: c;
`;

const StoreContext = React.createContext();
const SelectionContext = React.createContext();

const App = () => {
  const [editing, open, close] = useToggle();
  const [mailbox, dispatch, T] = useMailbox();
  const [selected, setSelected] = useState([]);

  return (
    <StoreContext.Provider value={{ mailbox, dispatch, T }}>
      <SelectionContext.Provider value={[selected, setSelected]}>
        <Container>
          <StyledAppBar />
          <StyledSideBar />
          <StyledRouter>
            <Mailbox path=":folder" />
          </StyledRouter>
          {/* {editing && <NewMessage />} */}
        </Container>
      </SelectionContext.Provider>
    </StoreContext.Provider>
  );
};

export default App;
export { StoreContext, SelectionContext };
