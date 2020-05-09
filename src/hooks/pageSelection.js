import { useEffect, useContext } from "react";
import { SelectionContext } from "../components/App";

const usePageSelection = (folder, tab, page) => {
  const [selected, setSelected] = useContext(SelectionContext);
  const allSelected = page.length === selected.length;
  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(page);
    }
  };

  useEffect(() => {
    setSelected([]);
  }, [folder, setSelected, tab]);

  return [allSelected, toggleAll];
};

export default usePageSelection;
