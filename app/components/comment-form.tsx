import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useCreateComment } from "@/hooks";
import { createCommentSchema } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FieldInfo from "./field-info";
import { toast } from "sonner";

type CommentFormProps = {
  id: number;
  isParent?: boolean;
  onSuccess?: () => void;
};

export default function CommentForm({
  id,
  isParent,
  onSuccess,
}: CommentFormProps) {
  const createComment = useCreateComment();
  const form = useForm({
    defaultValues: {
      content: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createCommentSchema,
    },
    onSubmit: async ({ value }) => {
      await createComment.mutateAsync(
        {
          id,
          content: value.content,
          isParent: !!isParent,
        },
        {
          onSuccess: (data) => {
            if (!data.success) {
              if (!data.isFormError) {
                toast.error("Failed to create comment", {
                  description: data.error,
                });
              }

              form.setErrorMap({
                onSubmit: data.isFormError ? data.error : "Unexpected error",
              });
              throw new Error(data.error);
            } else {
              form.reset(), onSuccess?.();
            }
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="grid gap-2"
    >
      <form.Field
        name="content"
        children={(field) => (
          <div className="grid gap-2">
            <Textarea
              id={field.name}
              aria-label={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What are your thoughts?..."
              rows={4}
              className="w-full p-2 text-sm"
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
              {errorMap.onSubmit?.toString()}
            </p>
          ) : null
        }
      />
      <div className="flex justify-end space-x-2">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Add comment"}
            </Button>
          )}
        />
      </div>
    </form>
  );
}
