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
import { seo } from "@/lib/utils";
import { Header } from "@/components";
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
        title: "Carbon Daily",
        description:
          "A fast and powerful daily news app built with TanStack Start, HonoJS",
        keywords:
          "News,React,TanStack,Hono,JavaScript,TypeScript,Coding,Noah,Daily",
        image: "https://i.ibb.co/Xx1L9bXW/caron-daily-og.png",
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
      { rel: "manifest", href: "/assets/site.webmanifest", color: "#fffff" },
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
        import("@tanstack/react-router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col bg-[#f5f5ed]">
          <Header />
          <main className="container mx-auto grow p-4">{children}</main>
          <footer className="p-4 text-center">
            <p className="text-muted-foreground text-sm">CarbonDaily &copy;</p>
          </footer>
        </div>
        <Toaster />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools />
        <Scripts />
      </body>
    </html>
  );
}
