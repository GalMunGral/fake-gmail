import React, { useContext } from "react";
import { useNavigate, useParams } from "@reach/router";
import useMails from "../hooks/mails";
import { StoreContext } from "../contexts";

const Detail = () => {
  const navigate = useNavigate();
  const { folder, id } = useParams();
  const mails = useMails(folder);
  const { dispatch, T } = useContext(StoreContext);
  const mail = mails.find((item) => item.id === id);
  const { subject, senderName, senderEmail, content } = mail;
  const goBack = () => navigate(-1);
  const deleteMail = () => {
    navigate("./");
    setTimeout(() => dispatch({ type: T.DELETE, payload: { id, folder } }));
  };
  return (
    <div>
      <button onClick={goBack}>back</button>
      <button onClick={deleteMail}>Delete</button>
      <div>{subject}</div>
      <div>
        <span>{senderName}</span>&lt;<span>{senderEmail}</span>&gt;
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Detail;
