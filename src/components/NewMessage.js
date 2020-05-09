import React, { useContext, useState } from "react";
import styled from "styled-components";
import { EditorContext } from "../contexts";

const Window = styled.div`
  border: 1px solid black;
  background: white;
  position: fixed;
  bottom: 0;
  right: 100px;
  width: 500px;
  z-index: 998;
`;

const Input = ({ label, value, setValue }) => {
  return (
    <div>
      <label>
        {label}
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </div>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  height: 50vh;
`;
const Button = styled.button``;

const EditButton = styled.button``;

const Header = styled.header`
  background: var(--gray);
  height: 30px;
`;

const NewMessage = () => {
  const {
    recipientEmail,
    setRecipientEmail,
    subject,
    setSubject,
    content,
    updateHistory,
    undo,
    redo,
    saveDraft,
    send,
    close,
  } = useContext(EditorContext);

  const [minimized, setMinimized] = useState(false);
  const toggle = () => setMinimized(!minimized);

  return (
    <Window>
      <Header onClick={toggle}>
        New Message
        <button
          onClick={() => {
            saveDraft();
            close();
          }}
        >
          close
        </button>
      </Header>
      {!minimized && (
        <section>
          <Input
            label="To:"
            value={recipientEmail}
            setValue={setRecipientEmail}
          />
          <Input label="Subject:" value={subject} setValue={setSubject} />
          <TextArea value={content} onChange={updateHistory}></TextArea>
          <EditButton onClick={undo}>Undo</EditButton>
          <EditButton onClick={redo}>Redo</EditButton>
          <Button
            onClick={() => {
              send();
              close();
            }}
          >
            Send
          </Button>
        </section>
      )}
    </Window>
  );
};

export default NewMessage;
