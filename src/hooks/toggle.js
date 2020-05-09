import { useState } from "react";

const useToggle = () => {
  const [editing, setEditing] = useState(false);
  const open = () => setEditing(true);
  const close = () => setEditing(false);
  return [editing, open, close];
};

export default useToggle;
