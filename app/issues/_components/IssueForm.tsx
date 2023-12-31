"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller, Form } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

type IssueFormData = z.infer<typeof IssueSchema>;

interface Props {
  issue?: Issue; // This is optional (WE USE ? for optional) because this ony use on Edit page
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true); // set loading

      //Check the PATCH (update) here and call api for update data pass from the Props
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues");
        router.refresh(); // this tell to Next.js to refresh the current rout -> issue page(39.6 - Video)
      } else {
        await axios.post("/api/issues", data); //send data to issue api
        router.push("/issues"); //Navigate to issues page after form submition
        router.refresh(); // this tell to Next.js to refresh the current rout -> issue page(39.6 - Video)
      }
    } catch (error) {
      setIsSubmitting(false); // set loading
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4 mt-5" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Add New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
