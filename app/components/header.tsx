import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useQuery(userQueryOptions());

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
              top
            </Link>
            <Link to="/submit" className="hover:underline">
              đăng
            </Link>
          </nav>
        </div>
        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            <>
              <span>{user}</span>
              <Button
                asChild
                size={"sm"}
                variant={"secondary"}
                className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
              >
                <a href="api/auth/logout">Đăng xuất</a>
              </Button>
            </>
          ) : (
            <Button
              asChild
              size={"sm"}
              variant={"secondary"}
              className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
            >
              <Link to="/login">Đăng nhập</Link>
            </Button>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                mới
              </Link>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                top
              </Link>
              <Link
                to="/submit"
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                đăng
              </Link>
              {user ? (
                <>
                  <span>người dùng: {user}</span>
                  <Button
                    asChild
                    size={"sm"}
                    variant={"secondary"}
                    className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                  >
                    <a href="api/auth/logout">Đăng xuất</a>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size={"sm"}
                  variant={"secondary"}
                  className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                >
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Đăng nhập
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
