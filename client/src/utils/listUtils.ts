export const pagenatedData = <T>(currentPage: number, data: T[]) => {
  const PAGE_OFFSET = 15;

  const firstDataIndex =
    currentPage === 1 ? 0 : PAGE_OFFSET * (currentPage - 1);
  const lastDataIndex = PAGE_OFFSET * currentPage;

  if (lastDataIndex > data.length) return data.slice();
  return data.slice(firstDataIndex, lastDataIndex);
};
