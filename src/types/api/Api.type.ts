type Response = {
  code: number;
  message: string;
};

type PaginationData = {
  limit: number;
  offset: number;
  total: number;
  hasMore: boolean;
};

export interface ApiSuccess<T> {
  success: true;
  data: T;
  info: Response;
  meta?: PaginationData;
}

export interface ApiError {
  success: false;
  info: Response;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type ApiProps = {
  endpoint: string;
  options?: RequestInit;
};
