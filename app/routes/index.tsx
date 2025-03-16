import { createFileRoute } from "@tanstack/react-router";
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { useUpvotePost } from "@/hooks";
import { z } from "zod";
import { getPosts } from "@/lib/api";
import { orderSchema, sortBySchema } from "@/types";
import { Button } from "@/components/ui/button";
import { PostCard, SortBar } from "@/components";

const homeSearchSchema = z.object({
  sortBy: fallback(sortBySchema, "points").default("recent"),
  order: fallback(orderSchema, "desc").default("desc"),
  author: z.optional(fallback(z.string(), "")),
  site: z.optional(fallback(z.string(), "")),
});

function postsInfiniteQueryOptions({
  sortBy,
  order,
  author,
  site,
}: z.infer<typeof homeSearchSchema>) {
  return infiniteQueryOptions({
    queryKey: ["posts", sortBy, order, author, site],
    queryFn: ({ pageParam }) =>
      getPosts({
        pageParam,
        pagination: {
          sortBy,
          order,
          author,
          site,
        },
      }),
    initialPageParam: 1,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) return undefined;

      return lastPageParam + 1;
    },
  });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Trang chủ | Carbon News" }],
  }),
  validateSearch: zodSearchValidator(homeSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { sortBy, order, author, site } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      postsInfiniteQueryOptions({ sortBy, order, author, site }),
    );
  const upvoteMutation = useUpvotePost();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Bài viết</h1>
      <SortBar sortBy={sortBy} order={order} />
      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.data.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={() => upvoteMutation.mutate(post.id.toString())}
            />
          )),
        )}
      </div>
      <div className="mt-6">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Đang tải thêm..."
            : hasNextPage
              ? "Tải thêm"
              : "Không có bài viết nào khác"}
        </Button>
      </div>
    </div>
  );
}
