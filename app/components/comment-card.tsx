import React from "react";
import {
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { cn, relativeTime } from "@/lib/utils";
import { getCommentComments, userQueryOptions } from "@/lib/api";
import { useUpvoteComment } from "@/hooks";
import type { Comment } from "@/types";
import { Separator } from "@/components/ui/separator";
import CommentForm from "./comment-form";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MessageSquareIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";

type CommentCardProps = {
  comment: Comment;
  depth: number;
  activeReplyId: number | null;
  setActiveReplyId: React.Dispatch<React.SetStateAction<number | null>>;
  isLast: boolean;
  toggleUpvote: ReturnType<typeof useUpvoteComment>["mutate"];
};

export default function CommentCard({
  comment,
  depth,
  activeReplyId,
  setActiveReplyId,
  isLast,
  toggleUpvote,
}: CommentCardProps) {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(userQueryOptions());
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["comments", "comment", comment.id],
    queryFn: ({ pageParam }) => getCommentComments(comment.id, pageParam),
    initialPageParam: 1,
    staleTime: Infinity,
    initialData: {
      pageParams: [1],
      pages: [
        {
          success: true,
          message: "Comments fetched",
          data: comment.childComments ?? [],
          pagination: {
            page: 1,
            totalPages: Math.ceil(comment.commentCount / 2),
          },
        },
      ],
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) return undefined;

      return lastPageParam + 1;
    },
  });
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const isUpvoted = comment.commentUpvotes.length > 0;
  const isReplying = activeReplyId === comment.id;
  const loadFirstPage =
    comments?.pages[0]!.data?.length === 0 && comment.commentCount > 0;
  const isDraft = comment.id === -1;

  return (
    <div
      className={cn(
        depth > 0 && "border-border ml-4 border-l pl-4",
        isDraft && "pointer-events-none opacity-50",
      )}
    >
      <div className="py-2">
        <div className="mb-2 flex items-center space-x-1 text-xs">
          <button
            disabled={!user}
            onClick={() =>
              toggleUpvote({
                id: comment.id.toString(),
                postId: comment.postId,
                parentCommentId: comment.parentCommentId,
              })
            }
            className={cn(
              "hover:text-primary flex items-center space-x-1",
              isUpvoted ? "text-primary" : "text-muted-foreground",
            )}
          >
            <ChevronUpIcon size={14} />
            <span className="font-medium">{comment.points}</span>
          </button>
          <span className="text-muted-foreground">·</span>
          <span className="font-medium">{comment.author.username}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            {relativeTime(comment.createdAt)}
          </span>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? <PlusIcon size={14} /> : <MinusIcon size={14} />}
          </button>
        </div>
        {!isCollapsed && (
          <>
            <p className="text-foreground mb-2 text-sm">{comment.content}</p>
            <div className="text-muted-foreground flex items-center space-x-1 text-xs">
              {user && (
                <button
                  className="hover:text-foreground flex items-center space-x-1"
                  onClick={() => {
                    setActiveReplyId(isReplying ? null : comment.id);
                  }}
                >
                  <MessageSquareIcon size={12} />
                  <span>reply</span>
                </button>
              )}
            </div>
            {isReplying && (
              <div className="mt-2">
                <CommentForm
                  id={comment.id}
                  isParent
                  onSuccess={() => setActiveReplyId(null)}
                />
              </div>
            )}
          </>
        )}
      </div>
      {!isCollapsed &&
        comments &&
        comments.pages.map((page, index) => {
          const isLastPage = index === comments.pages.length - 1;
          return page.data.map((reply, index) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              isLast={isLastPage && index === page.data.length - 1}
              toggleUpvote={toggleUpvote}
            />
          ));
        })}
      {!isCollapsed && (hasNextPage || loadFirstPage) && (
        <div className="mt-2">
          <button
            onClick={() => {
              if (loadFirstPage) {
                queryClient.invalidateQueries({
                  queryKey: ["comments", "comment", comment.id],
                });
              } else {
                fetchNextPage();
              }
            }}
            disabled={!(hasNextPage || loadFirstPage) || isFetchingNextPage}
            className="text-muted-foreground hover:text-foreground flex items-center space-x-1 text-xs"
          >
            {isFetchingNextPage ? (
              <span>Loading...</span>
            ) : (
              <>
                <ChevronDownIcon size={12} />
                <span>More replies</span>
              </>
            )}
          </button>
        </div>
      )}
      {!isLast && <Separator className="my-2" />}
    </div>
  );
}
