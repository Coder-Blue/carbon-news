import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions());

    if (!user)
      throw redirect({ to: "/login", search: { redirect: location.href } });
  },
  component: () => <Outlet />,
});
