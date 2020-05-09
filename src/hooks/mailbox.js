import { useReducer } from "react";
import data from "../MOCK_DATA.json";

const Type = {
  DELETE: "DELETE",
  SAVE_DRAFT: "SAVE_DRAFT",
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
      const { id } = action.payload;
      return {
        ...state,
        inbox: state.inbox.filter((item) => item.id !== id),
        trash: [state.inbox.find((item) => item.id === id), ...state.trash],
      };
    }
    case Type.SAVE_DRAFT: {
      const { id, recipient, subject, content } = action.payload;
      return {
        ...state,
        drafts: [{ id, recipient, subject, content }, ...state.drafts],
      };
    }
    case Type.DELETE_SELECTED:
      const selected = new Set(action.payload);
      return {
        ...state,
        inbox: state.inbox.filter((item) => !selected.has(item)),
        trash: [...state.trash, ...action.payload],
      };
    default:
      return state;
  }
};

const useMailbox = () => {
  const [mailbox, dispatch] = useReducer(reducer, initialState);
  return [mailbox, dispatch, Type];
};

export default useMailbox;
