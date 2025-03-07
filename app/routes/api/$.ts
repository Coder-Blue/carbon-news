import { createAPIFileRoute } from "@tanstack/react-start/api";
import app from "@/server";

export const APIRoute = createAPIFileRoute("/api/$")({
  GET: ({ request }) => {
    return app.fetch(request);
  },

  POST: ({ request }) => {
    return app.fetch(request);
  },
});
