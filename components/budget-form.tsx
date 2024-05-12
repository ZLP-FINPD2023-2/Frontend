import React, {useEffect, useState} from 'react';
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import kyInstance from "@/utils/api";
import {useQuery} from "@tanstack/react-query";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const schema = z.object({
  amounts: z.record(z.number()).optional(),
  goal: z.string({
    required_error: "Цель обязательна",
  }),
  id: z.number().optional(),
  title: z.string({
    required_error: "Название обязательно",
  }).min(1, {message: "Название должно содержать хотя бы один символ"})
});

interface BudgetFormProps {
  onSubmit: SubmitHandler<FieldValues>,
  defaultValues?: BudgetInterface
}

const fetchGoals = (): Promise<GoalInterface[]> =>
  kyInstance.get('goal').then((response) => response.json())


const BudgetForm = ({onSubmit, defaultValues}: BudgetFormProps) => {
  const {data} = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  })
  const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        id: Number(defaultValues?.id) || 0,
        title: defaultValues?.title || "",
        goal: defaultValues?.goal.toString() || (data && data.length > 0 ? data[0].id.toString() : ""),
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
          <DialogTitle>Бюджет</DialogTitle>
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
          name="goal"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Цель</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="выберете цель"/>
                </SelectTrigger>
                <SelectContent>
                  {data?.map((goal) => (
                    <SelectItem key={goal.id} value={goal.id.toString()}>{goal.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button variant="default" className="mt-4 w-full">Сохранить</Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
