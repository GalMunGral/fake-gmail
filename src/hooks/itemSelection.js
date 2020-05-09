import { useContext, useCallback } from "react";
import { SelectionContext } from "../contexts";

const useItemSelection = () => {
  const [selected, setSelected] = useContext(SelectionContext);

  const toggleItem = useCallback(
    (item, shouldSelect) => {
      if (shouldSelect) {
        if (selected.includes(item.id)) return;
        setSelected([...selected, item.id]);
      } else {
        setSelected(selected.filter((e) => e !== item.id));
      }
    },
    [selected, setSelected]
  );

  return [selected, toggleItem];
};

export default useItemSelection;
