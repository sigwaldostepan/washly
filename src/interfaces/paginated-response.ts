export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    total: number;
    totalPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
