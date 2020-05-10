import React, { useState, createContext } from "react";
import useStoreAsync from "../hooks/store";
import useEditor from "../hooks/editor";

const StoreContext = createContext();
const SelectionContext = createContext();
const EditorContext = createContext();

const withEditor = (Component) => () => {
  const editorHook = useEditor();
  return (
    <EditorContext.Provider value={editorHook}>
      <Component />
    </EditorContext.Provider>
  );
};

const withSelection = (Component) => () => {
  const [selected, setSelected] = useState([]);
  return (
    <SelectionContext.Provider value={[selected, setSelected]}>
      <Component />
    </SelectionContext.Provider>
  );
};

const withStore = (Component) => () => {
  const [mailbox, dispatch, T] = useStoreAsync();
  return (
    <StoreContext.Provider value={{ mailbox, dispatch, T }}>
      <Component />
    </StoreContext.Provider>
  );
};

export {
  StoreContext,
  SelectionContext,
  EditorContext,
  withEditor,
  withSelection,
  withStore,
};
