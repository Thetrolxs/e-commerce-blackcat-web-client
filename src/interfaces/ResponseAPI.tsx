export interface ResponseAPI<T> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string[];
}
