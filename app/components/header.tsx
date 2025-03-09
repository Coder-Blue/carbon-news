import { Link } from "@tanstack/react-router";
import Image from "@/components/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="border-border/40 bg-primary/95 supports-[backdrop-filter]:bg-primary/90 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="CarbonLogo"
              className="size-9 object-contain"
            />
            <p className="cursor-pointer text-2xl font-bold">CarbonNews</p>
          </Link>
          <nav className="hidden items-center space-x-4 md:flex">
            <Link to="/" className="hover:underline">
              mới
            </Link>
            <Link to="/" className="hover:underline">
              tốp
            </Link>
            <Link to="/" className="hover:underline">
              đăng
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"secondary"} size={"icon"} className="md:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="mb-2">
            <SheetHeader>
              <SheetTitle>CarbonNews</SheetTitle>
              <SheetDescription className="sr-only">
                Điều hướng
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:underline">
                mới
              </Link>
              <Link to="/" className="hover:underline">
                tốp
              </Link>
              <Link to="/" className="hover:underline">
                đăng
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
