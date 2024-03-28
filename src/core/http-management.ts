import { BASE_URL } from "../environments/environment.ts";
import { KEY_TOKEN, storeInStorage } from "./storage-management.ts";

/**
 * API 回應的格式
 */
export type APIResponseDTO<T> = {
  status: boolean;
  token: string;
  message: string;
  result: T;
};

/**
 * HTTP 請求的方法
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 發送 HTTP 請求
 *
 * @param method HTTP 請求的方法
 * @param url 要發送的請求的路徑
 * @param params 要傳送的參數
 * @param token 要傳送的 token
 * @returns
 */
export const fetchData = async <T = unknown>(
  method: HTTPMethod,
  url: string,
  params?: unknown,
  token?: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: params ? JSON.stringify(params) : undefined,
  });

  const data = (await response.json()) as APIResponseDTO<T>;
  if (!data.status) {
    throw new Error(data.message);
  }

  if (data.token) {
    storeInStorage(KEY_TOKEN, data.token, "LOCAL");
  }

  return data.result;
};
