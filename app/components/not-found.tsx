import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex size-full items-center justify-center p-2 text-2xl">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          404{" "}
          <Link to="/" className="hover:cursor-pointer hover:text-red-700">
            <span className="mr-2 gap-3 text-5xl">&#10683;</span>
          </Link>
        </p>
        <p className="text-lg">Không tìm thấy trang</p>
        <Button asChild>
          <Link to="/">Trở về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
