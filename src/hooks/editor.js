import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../contexts";
import useEditorHistory from "./editorHistory";

const useEditor = () => {
  const { dispatch, T } = useContext(StoreContext);
  const [content, updateHistory, undo, redo, resetHistory] = useEditorHistory();
  const [id, setId] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [editing, setEditing] = useState(false);
  const open = () => setEditing(true);
  const close = () => setEditing(false);

  const message = () => ({
    id,
    recipientEmail,
    senderEmail: "test@example.com",
    senderName: "Me",
    subject,
    content,
  });

  const saveDraft = () => {
    dispatch({
      type: T.SAVE_DRAFT,
      payload: message(),
    });
  };

  const send = () => {
    dispatch({
      type: T.SEND,
      payload: message(),
    });
  };

  const createDraft = () => {
    setId(uuidv4());
    setRecipientEmail("");
    setSubject("Subject Line");
    resetHistory("Type here...");
  };

  const replaceDraft = (draft) => {
    saveDraft();
    setId(draft.id);
    setRecipientEmail(draft.recipientEmail);
    setSubject(draft.subject);
    resetHistory(draft.content);
  };

  return {
    id,
    recipientEmail,
    setRecipientEmail,
    subject,
    setSubject,
    content,
    updateHistory,
    undo,
    redo,
    saveDraft,
    createDraft,
    replaceDraft,
    send,
    editing,
    setEditing,
    open,
    close,
  };
};

export default useEditor;
