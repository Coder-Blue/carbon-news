import { createAPIFileRoute } from "@tanstack/react-start/api";
import app from "@/server";

export const APIRoute = createAPIFileRoute("/api/$")({
  GET: ({ request }) => {
    return app.fetch(request);
  },

  POST: ({ request }) => {
    return app.fetch(request);
  },

  PUT: ({ request }) => {
    return app.fetch(request);
  },

  PATCH: ({ request }) => {
    return app.fetch(request);
  },

  DELETE: ({ request }) => {
    return app.fetch(request);
  },
});
