import { z } from "zod";
import { insertPostSchema } from "@/server/db/schemas/posts";
import { insertCommentsSchema } from "@/server/db/schemas/comments";
import type { ApiRoutes } from "@/server";

export type { ApiRoutes };

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Cần phải sử dụng ít nhất 3 kí tự")
    .max(31)
    .regex(/^[a-zA-Z0-9_]+$/, "Chỉ sử dụng kí tự trong bảng chữ cái và số"),
  password: z.string().min(3, "Cần phải sử dụng ít nhất 3 kí tự").max(255),
});

export const createPostSchema = insertPostSchema
  .pick({
    title: true,
    url: true,
    content: true,
  })
  .refine((data) => data.url || data.content, {
    message: "Phải cung cấp đầy đủ URL hoặc nội dung",
    path: ["url", "content"],
  });

export const sortBySchema = z.enum(["points", "recent"]);

export const orderSchema = z.enum(["asc", "desc"]);

export const paginationSchema = z.object({
  limit: z.number({ coerce: true }).optional().default(10),
  page: z.number({ coerce: true }).optional().default(1),
  sortBy: sortBySchema.optional().default("points"),
  order: orderSchema.optional().default("desc"),
  author: z.optional(z.string()),
  site: z.string().optional(),
});

export type SortBy = z.infer<typeof sortBySchema>;
export type Order = z.infer<typeof orderSchema>;

export const createCommentSchema = insertCommentsSchema.pick({ content: true });

export type Post = {
  id: number;
  title: string;
  url: string | null;
  content: string | null;
  points: number;
  createdAt: string;
  commentCount: number;
  author: {
    id: string;
    username: string;
  };
  isUpvoted: boolean;
};

export type Comment = {
  id: number;
  userId: string;
  content: string;
  points: number;
  depth: number;
  commentCount: number;
  createdAt: string;
  postId: number;
  parentCommentId: number | null;
  commentUpvotes: {
    userId: string;
  }[];
  author: {
    username: string;
    id: string;
  };
  childComment?: Comment[];
};

export type PaginatedResponse<T> = {
  pagination: {
    page: number;
    totalPages: number;
  };
  data: T;
} & Omit<SuccessResponse, "data">;
