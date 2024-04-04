"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import  toast  from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});
const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/course", values); //api route
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (e) {
      toast.error("Oops! Something went wrong");
    }
  };
  return (
    <>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div className="shadow-lg  rounded-md p-6">
          <h1 className="text-2xl"> Name Your Course</h1>
          <p className="text-sm text-slate-600">
            What would You Like to Name Your Course?Don't Worry, You Can Change
            This Later.
          </p>
          <Form {...form}>
            {/*By spreading ...form here we are passing form hook that we had created ucing zod and hookform */}

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Advanced Web Development"
                        {...field}
                        // by spreading field ~ manually defining onchange on blur events
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage>
                      {" "}
                      {/* //for displaying the encountered erors */}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button variant="destructive" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
