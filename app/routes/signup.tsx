import { useState } from "react";
import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { postSignup, userQueryOptions } from "@/lib/api";
import { loginSchema } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldInfo } from "@/components";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const signUpSearchSchema = z.object({
  redirect: fallback(z.string(), "/").default("/"),
});

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Đăng ký | Carbon News" }],
  }),
  validateSearch: zodSearchValidator(signUpSearchSchema),
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions());

    if (user) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await postSignup(value.username, value.password);

      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        router.invalidate();
        await navigate({ to: search.redirect });
        return null;
      } else {
        if (!res.isFormError) {
          toast.error("Đăng ký thất bại", { description: res.error });
        }
        form.setErrorMap({
          onSubmit: res.isFormError ? res.error : "Lỗi bất thường",
        });
      }
    },
  });

  return (
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl">Đăng ký</CardTitle>
            <CardDescription>
              Nhập thông tin chi tiết để tạo tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form.Field
                name="username"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Tên người dùng/Username</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Mật khẩu</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <button
                        className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ẩn" : "Hiện"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Subscribe
                selector={(state) => [state.errorMap]}
                children={([errorMap]) =>
                  errorMap?.onSubmit ? (
                    <p className="text-destructive text-[0.8rem] font-medium">
                      {errorMap.onSubmit?.toString()}
                    </p>
                  ) : null
                }
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full cursor-pointer"
                    >
                      {isSubmitting ? "..." : "Đăng ký"}
                    </Button>
                  </>
                )}
              />
            </div>
            <div className="mt-4 text-center text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="underline">
                Đăng nhập
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
