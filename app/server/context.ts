import type { Env } from "hono";
import type { Session, User } from "lucia";

export type Context = Env & {
  Variables: {
    user: User | null;
    session: Session | null;
  };
};
