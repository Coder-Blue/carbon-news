import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { Context } from "../context";

export const loggedIn = createMiddleware<Context>(async (c, next) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Chưa đăng ký" });
  }

  await next();
});
