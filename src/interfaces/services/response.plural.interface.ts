export interface ApiResponsePlural<T> {
  data: T[];
  message: string;
  response_code: string;
  total_count: number;
  meta: {
    page: number;
    pageCount: number;
    perPage: number;
    skipped: number;
    total: number;
  };
  status: boolean;
}
