import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dydfuf/ui/components/form";
import { Button } from "@dydfuf/ui/components/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@dydfuf/ui/components/use-toast";
import { Tag, TagInput } from "emblor";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function TagInputDemo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [tags, setTags] = React.useState<Tag[]>([]);

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="z-10 w-full flex flex-col items-center text-center gap-5">
      <div id="try" className="w-full py-8">
        <div className="w-full relative my-4 flex flex-col space-y-2">
          <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col items-start"
              >
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Topics</FormLabel>
                      <FormControl className="w-full">
                        <TagInput
                          {...field}
                          placeholder="Enter a topic"
                          tags={tags}
                          className="sm:min-w-[450px]"
                          setTags={(newTags) => {
                            setTags(newTags);
                            setValue("topics", newTags as [Tag, ...Tag[]]);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-left">
                        These are the topics that you&apos;re interested in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
