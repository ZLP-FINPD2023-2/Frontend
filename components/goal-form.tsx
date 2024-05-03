import React from 'react';
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
  id: z.number().optional(),
  target_amount: z.number(
    {
      required_error: "Сумма обязательна",
    }
  ),
  title: z.string(
    {
      required_error: "Название обязательно",
    }
  ),
});

interface GoalFormProps {
  onSubmit: SubmitHandler<FieldValues>,
  defaultValues?: GoalInterface
}

const GoalForm = ({onSubmit, defaultValues}: GoalFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        id: Number(defaultValues?.id) || 0,
        target_amount: Number(defaultValues?.target_amount) || 0,
        title: defaultValues?.title || ""
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
          <DialogTitle>Цель</DialogTitle>
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
          name="target_amount"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Сумма</FormLabel>
              <Input id="target_amount" placeholder="1 000 000" value={field.value}
                     onChange={(e) => field.onChange(+e.target.value)}/>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button variant="default" className="mt-4 w-full">Сохранить</Button>
      </form>
    </Form>
  );
};

export default GoalForm;
