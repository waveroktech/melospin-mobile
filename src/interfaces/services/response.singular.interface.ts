export interface ApiResponseSingular<T = {}> {
  status: 'success' | 'failed';
  data?: T;
  message: string;
  code: string;
  response_code?: string; // Keep for backward compatibility
}
