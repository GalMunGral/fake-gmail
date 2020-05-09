import { useState } from "react";

const usePagination = (pageSize, totalSize) => {
  const [page, setPage] = useState(0);
  const start = page * pageSize;
  const end = start + pageSize;
  const pageCount = Math.ceil(totalSize / pageSize);
  const nextPage = () => setPage(Math.min(page + 1, pageCount - 1));
  const prevPage = () => setPage(Math.max(page - 1, 0));
  return [start, end, nextPage, prevPage];
};

export default usePagination;
