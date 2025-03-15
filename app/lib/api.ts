import { hc } from "hono/client";
import { queryOptions } from "@tanstack/react-query";
import type { ApiRoutes, ErrorResponse, SuccessResponse } from "@/types";

const client = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;

export async function postSignup(username: string, password: string) {
  try {
    const res = await client.auth.signup.$post({
      form: {
        username,
        password,
      },
    });

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;
    return data;
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
}

export async function postLogin(username: string, password: string) {
  try {
    const res = await client.auth.login.$post({
      form: {
        username,
        password,
      },
    });

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;
    return data;
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
}

export async function getUser() {
  const res = await client.auth.user.$get();

  if (res.ok) {
    const data = await res.json();
    return data.data.username;
  }

  return null;
}

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });
