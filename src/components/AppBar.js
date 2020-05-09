import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background: gray;
`;

const MessageList = ({ className }) => <Div className={className}></Div>;

export default MessageList;
