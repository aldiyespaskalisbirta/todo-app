"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

import { CirclePlus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export function Task() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
      await axios.post(`/api/task`, values);
      toast.success("TASK ADDED!!!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("SORY TASK CAN'T ADDED");
    }
  };
  return (
    <div className="rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        TODO TASK
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancle</>
          ) : (
            <>
              <CirclePlus className="h-4 w-4 mr-2" />
              ADD
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Add a task..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="w-full"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
