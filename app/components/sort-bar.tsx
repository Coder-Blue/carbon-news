import { useNavigate } from "@tanstack/react-router";
import type { Order, SortBy } from "@/types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

type SortBarProps = {
  sortBy: SortBy;
  order: Order;
};

export default function SortBar({ sortBy, order }: SortBarProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center justify-between">
      <Select
        value={sortBy}
        onValueChange={(sortBy: SortBy) =>
          navigate({
            to: ".",
            search: (prev: any) => ({
              ...prev,
              sortBy,
            }),
          })
        }
      >
        <SelectTrigger className="bg-background w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="points" className="cursor-pointer">
            Điểm số
          </SelectItem>
          <SelectItem value="recent" className="cursor-pointer">
            Gần đây
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() =>
          navigate({
            to: ".",
            search: (prev: any) => ({
              ...prev,
              order: order === "asc" ? "desc" : "asc",
            }),
          })
        }
        aria-label={order === "asc" ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"}
      >
        <ArrowUpIcon
          className={cn(
            "size-4 transition-transform duration-300",
            order === "desc" && "rotate-180",
          )}
        />
      </Button>
    </div>
  );
}
