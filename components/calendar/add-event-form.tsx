import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerInput } from "@/lib/utils/time-picker-input";
import { AccessToken } from "@/types";

const FormSchema = z.object({
  eventName: z.string({
    required_error: "An event name is required.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  location: z.string().optional(),
  description: z.string().optional(),
});

const AddEventForm = ({ accessToken }: AccessToken) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(accessToken);
    console.log(values);
    try {
      const response = await fetch("/api/addEvent", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      if (response.ok) {
        console.log("Event added");
      } else {
        console.error("Failed to add event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="pt-10 w-[90%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your event's name here"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Start Date</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border flex justify-center">
                      <div className="flex items-end gap-2 w-60">
                        <div className="w-full gap-1 text-center">
                          <TimePickerInput
                            picker="hours"
                            date={field.value}
                            setDate={field.onChange}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                            className="w-full gap-1 text-center"
                          />
                        </div>
                        <div className="flex h-10 items-center">:</div>
                        <div className="gap-1 text-center">
                          <TimePickerInput
                            picker="minutes"
                            date={field.value}
                            setDate={field.onChange}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            className="w-full gap-1 text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border flex justify-center">
                      <div className="flex items-end gap-2 w-60">
                        <div className="w-full gap-1 text-center">
                          <TimePickerInput
                            picker="hours"
                            date={field.value}
                            setDate={field.onChange}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                            className="w-full gap-1 text-center"
                          />
                        </div>
                        <div className="flex h-10 items-center">:</div>
                        <div className="gap-1 text-center">
                          <TimePickerInput
                            picker="minutes"
                            date={field.value}
                            setDate={field.onChange}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            className="w-full gap-1 text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a description for the event"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEventForm;
