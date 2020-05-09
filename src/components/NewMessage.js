// import React, { useState, createRef, useContext, useMemo } from "react";
// import { v4 as uuidv4 } from "uuid";
// import styled from "styled-components";
// import useHistoryReducer from "../hooks/editor";
// import MailContext from "../contexts/MailContext";

// const Window = styled.div`
//   border: 1px solid black;
//   background: white;
//   position: fixed;
//   bottom: 0;
//   right: 100px;
//   width: 500px;
// `;

// const Input = ({ label, value, setValue }) => {
//   return (
//     <div>
//       <label>
//         {label}
//         <input value={value} onChange={(e) => setValue(e.target.value)} />
//       </label>
//     </div>
//   );
// };

// const TextArea = styled.textarea`
//   width: 100%;
//   height: 50vh;
// `;
// const Button = styled.button``;

// const Header = styled.header`
//   background: var(--gray);
//   height: 30px;
// `;

// const NewMessage = ({ close }) => {
//   const id = useMemo(() => uuidv4(), []);
//   const [receiver, setReceiver] = useState("");
//   const [subject, setSubject] = useState("");
//   const [minimized, setMinimized] = useState(false);
//   const { dispatch: _dispatch } = useContext(MailContext);
//   const textAreaRef = createRef();
//   const [content, dispatch] = useHistoryReducer();
//   const toggle = () => setMinimized(!minimized);

//   const closeWindow = () => {
//     _dispatch({
//       type: "SAVE_DRAFT",
//       payload: {
//         id,
//         receiver,
//         subject,
//         content,
//       },
//     });
//     close();
//   };

//   return (
//     <Window>
//       <Header onClick={toggle}>New Message</Header>
//       <button onClick={closeWindow}>close</button>
//       {!minimized && (
//         <section>
//           <Input label="To:" value={receiver} setValue={setReceiver} />
//           <Input label="Subject:" value={subject} setValue={setSubject} />
//           <TextArea
//             ref={textAreaRef}
//             value={content.current}
//             onChange={(e) =>
//               dispatch({ type: "UPDATE", payload: e.target.value })
//             }
//           ></TextArea>
//           <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
//           <button onClick={() => dispatch({ type: "REDO" })}>Redo</button>
//           <Button onChange={() => {}}>Send</Button>
//         </section>
//       )}
//     </Window>
//   );
// };

// export default NewMessage;
