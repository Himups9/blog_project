export const getPagination = (page = 1, limit = 10) => {
  const currentPage = Number(page);
  const pageSize = Number(limit);

  return {
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    currentPage,
    pageSize,
  };
};