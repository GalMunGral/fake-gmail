import { useContext } from "react";
import { StoreContext } from "../components/App";

const useMails = (folder, tab = null) => {
  const { mailbox } = useContext(StoreContext);
  return folder === "inbox"
    ? mailbox[folder].filter((item) => item.category === tab)
    : mailbox[folder];
};

export default useMails;
