export interface ApiResponseSingular<T = {}> {
  data?: T;
  message: string;
  response_code: string;
}
