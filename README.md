# TLDR;

a hackernews clone made with:

- [React](https://react.dev)

- [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)

- [TanStack React Query](https://tanstack.com/query/latest)

- [TanStack Form](https://tanstack.com/form/latest)

- [Hono](https://hono.dev/)

- [Drizzle](https://orm.drizzle.team/docs/get-started)

- [Lucia Auth](https://lucia-auth.com/)

- [shadcn/ui](https://ui.shadcn.com/)

# Why does this exist?

- for researching, testing new alternative meta-framework compare to [NextJS](https://nextjs.org).

- youtube video for website inspiration: [BetterStack](https://www.youtube.com/watch?v=eHbO5OWBBpg)

# How to run this?

- Rename `.env.example` to `.env`, then adding a PostgreSQL database url like Neon, etc.

```env
DATABASE_URL=
```

- Run the following command:

```bash
npm install

#or

bun install
```

Then

```bash
npx drizzle-kit push

#or

bunx drizzle-kit push
```

Then

```bash
npm run dev

#or

bun dev
```

- Details are in the docs I linked, follow the guiding to further developments.

- contact for supporting: [email](mailto:trananhquan1009@gmail.com)
