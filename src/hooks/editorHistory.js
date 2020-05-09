import { useReducer } from "react";

const initialState = {
  past: [],
  current: "",
  future: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UNDO": {
      if (state.past.length === 0) return state;
      return {
        past: state.past.slice(1),
        current: state.past[0],
        future: [state.current, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      return {
        past: [state.current, ...state.past],
        current: state.future[0],
        future: state.future.slice(1),
      };
    }
    case "UPDATE": {
      return {
        past: [state.current, ...state.past],
        current: action.payload,
        future: [],
      };
    }
    case "RESET": {
      return {
        ...initialState,
        current: action.payload,
      };
    }
    default:
      return state;
  }
};

const useEditorHistory = () => {
  const [{ current: content }, dispatch] = useReducer(reducer, initialState);
  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });
  const updateHistory = (e) =>
    dispatch({ type: "UPDATE", payload: e.target.value });
  const resetHistory = (content) =>
    dispatch({ type: "RESET", payload: content });
  return [content, updateHistory, undo, redo, resetHistory];
};

export default useEditorHistory;
