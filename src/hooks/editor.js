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
    default:
      return state;
  }
};

const useHistoryReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state.current, dispatch];
};

export default useHistoryReducer;
