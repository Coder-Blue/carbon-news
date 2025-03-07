import React, { type ReactNode } from "react";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { seo } from "../lib/utils";
import stylesCSS from "../styles.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Carbon News",
        description:
          "Đây là một trang cập nhật tin tức ngắn, nhanh và tự do được viết bằng TanStack Start và Hono",
        keywords: "News,React,TanStack,Hono,JavaScript,TypeScript,Coding,Noah",
      }),
    ],
    links: [
      { rel: "stylesheet", href: stylesCSS },
      { rel: "author", href: "https://github.com/Coder-Blue" },
      {
        rel: "icon",
        href: "/favicon/favicon.ico",
      },
      { rel: "shortcut icon", href: "/favicon/favicon-16x16.png" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools />
        <Scripts />
      </body>
    </html>
  );
}
