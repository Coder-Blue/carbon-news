# TLDR;

một phiên bản nhái của hackernews được sử dụng các công nghệ sau:

- [React](https://react.dev)

- [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)

- [TanStack React Query](https://tanstack.com/query/latest)

- [TanStack Form](https://tanstack.com/form/latest)

- [Hono](https://hono.dev/)

- [Drizzle](https://orm.drizzle.team/docs/get-started)

- [Lucia Auth](https://lucia-auth.com/)

- [shadcn/ui](https://ui.shadcn.com/)

# Tại sao repo này tồn tại?

- thử nghiệm React meta-framework thay thế ngoài [NextJS](https://nextjs.org).

- video youtube lấy ý tưởng chính cho app: [BetterStack](https://www.youtube.com/watch?v=eHbO5OWBBpg)

# Cách để chạy?

- Đổi tên `.env.example` thành `.env`, rồi thêm đường link kết nối PostgreSQL như Neon, vân vân.

```env
DATABASE_URL=
```

- Rồi chạy lần lượt các câu lệnh sau:

```bash
npm install

#hoặc

bun install
```

Rồi

```bash
npx drizzle-kit push

#hoặc

bunx drizzle-kit push
```

Rồi

```bash
npm run dev

#hoặc

bun dev
```

- Thông tin chi tiết đều đã được viết ở đây, hãy theo dõi, và bạn có quyền đóng góp hỗ trợ.

# Donate

- tác giả thiếu thốn, donate đi <3

- liên hệ hỗ trợ: [email](mailto:trananhquan1009@gmail.com)

![BIDV](https://github.com/Coder-Blue/argon-note/blob/main/donation/IMG_4049.jpg?raw=true)
