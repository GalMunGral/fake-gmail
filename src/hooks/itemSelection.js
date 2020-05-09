import { useContext, useCallback } from "react";
import { SelectionContext } from "../components/App";

const useItemSelection = () => {
  const [selected, setSelected] = useContext(SelectionContext);

  const toggleItem = useCallback(
    (item, shouldSelect) => {
      if (shouldSelect) {
        if (selected.includes(item)) return;
        setSelected([...selected, item]);
      } else {
        setSelected(selected.filter((e) => e !== item));
      }
    },
    [selected, setSelected]
  );

  return [selected, toggleItem];
};

export default useItemSelection;
