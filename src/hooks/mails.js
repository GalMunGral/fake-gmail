import { useContext } from "react";
import { StoreContext } from "../contexts";

const useMails = (folder, tab = null) => {
  const { mailbox } = useContext(StoreContext);
  return folder === "inbox" && tab
    ? mailbox["inbox"].filter((item) => item.category === tab)
    : mailbox[folder];
};

export default useMails;
