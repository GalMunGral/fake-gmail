import { useEffect, useContext } from "react";
import { SelectionContext } from "../contexts";

const usePageSelection = (folder, tab, page) => {
  const [selected, setSelected] = useContext(SelectionContext);
  const allSelected = page.length && page.length === selected.length;
  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(page.map((item) => item.id));
    }
  };

  useEffect(() => {
    setSelected([]);
  }, [folder, setSelected, tab]);

  return [allSelected, toggleAll];
};

export default usePageSelection;
