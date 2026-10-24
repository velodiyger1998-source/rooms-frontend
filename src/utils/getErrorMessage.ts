import axios from "axios";

interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (message) return message;
  }
  return "Что-то пошло не так. Попробуйте ещё раз";
}