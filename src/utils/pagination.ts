import { PaginatedResponse } from '@/interfaces';

export const getPaginationResponse = <T>(
  data: T[],
  total: number,
  currentPage: number,
): PaginatedResponse<T> => {
  const totalPage = Math.ceil(total / 10);
  const hasNextPage = currentPage < totalPage;
  const hasPrevPage = currentPage > 1;

  return {
    data,
    meta: {
      currentPage,
      total,
      totalPage,
      hasNextPage,
      hasPrevPage,
    },
  };
};
