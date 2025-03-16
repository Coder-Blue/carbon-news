import {
  createFileRoute,
  useBlocker,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { postSubmit } from "@/lib/api";
import { createPostSchema } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldInfo } from "@/components";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/submit")({
  head: () => ({
    meta: [{ title: "Đăng bài | Carbon News" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      url: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createPostSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await postSubmit(value.title, value.url, value.content);

      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.invalidate();
        await navigate({ to: "/post", search: { id: res.data.postId } });
        return;
      } else {
        if (!res.isFormError) {
          toast.error("Hiện không thể đăng bài viết", {
            description: res.error,
          });
        }
        form.setErrorMap({
          onSubmit: res.isFormError ? res.error : "Lỗi bất thường",
        });
      }
    },
  });

  const shouldBlock = form.useStore(
    (state) => state.isDirty && !state.isSubmitting,
  );

  useBlocker({
    condition: shouldBlock,
    blockerFn: () =>
      window.confirm("Bạn chưa đăng bài xong, bạn có chắc muốn rời trang?"),
  });

  return (
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-lg">
        <CardHeader>
          Đăng bài viết mới
          <CardDescription>
            Để trống url để đưa ra câu hỏi thảo luận. Nếu không có url, văn bản
            sẽ xuất hiện ở đầu chủ đề. Còn nếu có url, văn bản là tùy ý.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="grid gap-4"
        >
          <CardContent>
            <div className="grid gap-4">
              <form.Field
                name="title"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Tiêu đề</Label>
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
                name="url"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Liên kết/URL</Label>
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
                name="content"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Nội dung</Label>
                    <Textarea
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
              <form.Subscribe
                selector={(state) => [state.errorMap]}
                children={([errorMap]) =>
                  errorMap?.onSubmit ? (
                    <p className="text-destructive text-[0.8rem] font-medium">
                      {errorMap.onSubmit.toString()}
                    </p>
                  ) : null
                }
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full"
                  >
                    {isSubmitting ? "..." : "Đăng bài"}
                  </Button>
                )}
              />
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
