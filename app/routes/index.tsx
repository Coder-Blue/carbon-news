import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Trang chủ | Carbon News" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-3xl text-blue-500">Hello "/"!</div>;
}
