import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { getComments, getPost } from "@/lib/api";
import { useUpvoteComment, useUpvotePost } from "@/hooks";
import { orderSchema, sortBySchema } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { CommentCard, PostCard, SortBar } from "@/components";
import { ChevronDownIcon } from "lucide-react";

const postSearchSchema = z.object({
  id: fallback(z.number(), 0).default(0),
  sortBy: fallback(sortBySchema, "points").default("points"),
  order: fallback(orderSchema, "desc").default("desc"),
});

function postQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: Infinity,
    retry: false,
    throwOnError: true,
  });
}

function commentsInfiniteQueryOptions({
  id,
  sortBy,
  order,
}: z.infer<typeof postSearchSchema>) {
  return infiniteQueryOptions({
    queryKey: ["comments", "post", id, sortBy, order],
    queryFn: ({ pageParam }) =>
      getComments(id, pageParam, 10, {
        sortBy,
        order,
      }),
    initialPageParam: 1,
    staleTime: Infinity,
    retry: false,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) return undefined;

      return lastPageParam + 1;
    },
  });
}

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [{ title: "Bài viết | Carbon News" }],
  }),
  validateSearch: zodSearchValidator(postSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { id, sortBy, order } = Route.useSearch();
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const data = useSuspenseQuery(postQueryOptions(id));
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    commentsInfiniteQueryOptions({ id, sortBy, order }),
  );

  const upvotePost = useUpvotePost();
  const upvoteComment = useUpvoteComment();

  return (
    <div className="mx-auto max-w-3xl">
      {data && (
        <PostCard
          post={data.data.data}
          onUpvote={() => upvotePost.mutate(id.toString())}
        />
      )}
      <div className="mt-8 mb-4">
        <h2 className="text-foreground mb-2 text-lg font-semibold">
          Bình luận
        </h2>
        {comments && comments?.pages[0]!.data.length > 0 && (
          <SortBar sortBy={sortBy} order={order} />
        )}
      </div>
      {comments && comments!.pages[0]!.data.length > 0 && (
        <Card>
          <CardContent className="p-4">
            {comments.pages.map((page) =>
              page.data.map((comment, index) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  isLast={index === page.data.length - 1}
                  toggleUpvote={upvoteComment.mutate}
                />
              )),
            )}
            {hasNextPage && (
              <div className="mt-2">
                <button
                  onClick={() => {
                    fetchNextPage();
                  }}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-1 text-xs"
                >
                  {isFetchingNextPage ? (
                    <span>Đang tải...</span>
                  ) : (
                    <>
                      <ChevronDownIcon size={12} />
                      <span>Các câu trả lời khác</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
