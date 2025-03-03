import app from "@/app/server";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/$")({
  GET: ({ request }) => {
    return app.fetch(request);
  },

  POST: ({ request }) => {
    return app.fetch(request);
  },
});
