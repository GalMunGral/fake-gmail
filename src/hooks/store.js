import { useReducer } from "react";
import data from "../MOCK_DATA.json";

const Type = {
  DELETE: "DELETE",
  SAVE_DRAFT: "SAVE_DRAFT",
  SEND: "SEND",
  DELETE_SELECTED: "DELETE_SELECTED",
};

const initialState = {
  inbox: data,
  sent: [],
  drafts: [],
  trash: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case Type.DELETE: {
      const { id, folder } = action.payload;
      return {
        ...state,
        [folder]: state[folder].filter((item) => item.id !== id),
        trash: [state[folder].find((item) => item.id === id), ...state.trash],
      };
    }
    case Type.SAVE_DRAFT: {
      return {
        ...state,
        drafts: [
          action.payload,
          ...state.drafts.filter((item) => item.id !== action.payload.id),
        ],
      };
    }
    case Type.DELETE_SELECTED:
      const { folder, selected } = action.payload;
      const selectedSet = new Set(selected);
      return {
        ...state,
        [folder]: state[folder].filter((item) => !selectedSet.has(item.id)),
        trash: [
          ...state[folder].filter((item) => selectedSet.has(item.id)),
          ...state.trash,
        ],
      };
    case Type.SEND:
      const message = action.payload;
      return {
        ...state,
        drafts: state.drafts.filter((item) => item.id !== message.id),
        sent: [message, ...state.sent],
      };
    default:
      return state;
  }
};

const useStore = () => {
  const [mailbox, dispatch] = useReducer(reducer, initialState);
  return [mailbox, dispatch, Type];
};

export default useStore;
