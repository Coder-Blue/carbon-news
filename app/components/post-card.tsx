import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
import { cn, relativeTime } from "@/lib/utils";
import type { Post } from "@/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";
import { ChevronUpIcon } from "lucide-react";

type PostCardProps = {
  post: Post;
  onUpvote?: (id: number) => void;
};

export default function PostCard({ post, onUpvote }: PostCardProps) {
  const { data: user } = useQuery(userQueryOptions());

  return (
    <Card className="flex items-start justify-start pt-3">
      <button
        disabled={!user}
        onClick={() => {
          onUpvote?.(post.id);
        }}
        className={cn(
          "text-muted-foreground hover:text-primary ml-3 flex cursor-pointer flex-col items-center justify-center",
          post.isUpvoted ? "text-primary" : "",
        )}
      >
        <ChevronUpIcon size={20} />
        <span className="text-xs font-medium">{post.points}</span>
      </button>
      <div className="flex grow flex-col justify-between">
        <div className="flex items-start p-3 py-0">
          <div className="flex grow flex-wrap items-center gap-x-2 pb-1">
            <CardTitle className="text-xl font-medium">
              {post.url ? (
                <a
                  href={post.url}
                  className="text-foreground hover:text-primary hover:underline"
                >
                  {post.title}
                </a>
              ) : (
                <Link
                  to={"/"}
                  className="text-foreground hover:text-primary hover:underline"
                >
                  {post.title}
                </Link>
              )}
            </CardTitle>
            {post.url ? (
              <Link
                to={"/"}
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "hover:bg-primary/80 cursor-pointer text-xs font-normal transition-colors hover:underline",
                )}
                search={{ site: post.url }}
              >
                {new URL(post.url).hostname}
              </Link>
            ) : null}
          </div>
        </div>
        <CardContent className="p-3 pt-0">
          {post.content && (
            <p className="text-foreground mb-2 text-sm">{post.content}</p>
          )}
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-1 text-xs">
            <span>
              của{" "}
              <Link
                to={"/"}
                className="hover:underline"
                search={{ author: post.author.id }}
              >
                {post.author.username}
              </Link>
            </span>
            <span>·</span>
            <span>{relativeTime(post.createdAt)}</span>
            <span>·</span>
            <Link
              to={"/post"}
              className="hover:underline"
              search={{ id: post.id }}
            >
              {post.commentCount} bình luận
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
