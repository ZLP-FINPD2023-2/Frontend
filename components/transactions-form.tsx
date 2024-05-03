import React from 'react';
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

const schema = z.object({
  id: z.number().min(0, {message: "ID должен быть положительным числом"}),
  title: z.string().min(1, {message: "Укажите заголовок"}),
  date: z.date({
    required_error: "Дата транзакции обязательна",
  }),
  amount: z.number().min(0, {message: "Сумма должна быть положительным числом"}),
  budget_from: z.number().min(0, {message: "Бюджет от должен быть положительным числом"}),
  budget_to: z.number().min(0, {message: "Бюджет до должен быть положительным числом"}),
});

interface TransactionFormProps {
  onSubmit: SubmitHandler<FieldValues>,
  defaultValues?: TransactionInterface
}

const TransactionForm = ({onSubmit, defaultValues}: TransactionFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        id: Number(defaultValues?.id) || 0,
        title: defaultValues?.title || "",
        date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
        amount: Number(defaultValues?.amount) || 0,
        budget_from: Number(defaultValues?.budget_from) || 0,
        budget_to: Number(defaultValues?.budget_to) || 0,
      }
    }
  )
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="basis-1/2"
      >
        <DialogHeader>
          <DialogTitle>Транзакция</DialogTitle>
        </DialogHeader>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Название</FormLabel>
              <Input id="title" placeholder="название" value={field.value}
                     onChange={(e) => field.onChange(e.target.value)}/>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Сумма</FormLabel>
              <Input id="amount" placeholder="1 000 000" value={field.value}
                     onChange={(e) => field.onChange(+e.target.value)}/>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget_from"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Сумма</FormLabel>
              <Input id="budget_from" placeholder="1 000 000" value={field.value}
                     onChange={(e) => field.onChange(+e.target.value)}/>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget_to"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Сумма</FormLabel>
              <Input id="budget_to" placeholder="1 000 000" value={field.value}
                     onChange={(e) => field.onChange(+e.target.value)}/>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата рождения</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value &&
                        "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: ru,
                        })
                      ) : (
                        <span>Укажите дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button variant="default" className="mt-4 w-full">Сохранить</Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
