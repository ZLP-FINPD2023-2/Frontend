"use client"
import {Pencil, Trash2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"


import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"

import {Input} from "@/components/ui/input"

import {BarList} from '@tremor/react';
import * as React from 'react';
import {useState} from 'react';
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import kyInstance from "@/utils/api";
import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query'


interface GoalInterface {
  id: number,
  target_amount: number,
  title: string
}

const pages = [
  {
    name: 'Машина',
    value: 66,
  },
  {
    name: 'Дом',
    value: 25,
  },
  {
    name: 'Компьютер',
    value: 84,
  },
]

const schema = z.object({
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
const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const fetchGoals = (): Promise<GoalInterface[]> =>
  kyInstance.get('goal').then((response) => response.json())


export default function Goals() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
    }
  )
  const [extended, setExtended] = useState(false);
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  })
  const mutation = useMutation({
    mutationFn: fetchGoals,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['goals']})
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await kyInstance.post('goal', {
        json: data,
      }).json();
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Цели</h1>
        <Dialog>
          <DialogTrigger>
            <Button variant="default">Добавить</Button>
          </DialogTrigger>
          <DialogContent>
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
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative flex flex-col-reverse items-start md:flex-row gap-4">
        <Card className="h-screen rounded-3xl p-6 flex-1 md:w-1/2 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">№</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Накоплено</TableHead>
                <TableHead>Бюджеты</TableHead>
                <TableHead>Подробнее</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.id}</TableCell>
                  <TableCell>{goal.title}</TableCell>
                  <TableCell>{goal.target_amount}</TableCell>
                  <TableCell className="flex gap-3">
                    <Pencil className="h-5 w-5 hover:text-gray-700"/>
                    <Trash2 className="h-5 w-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </Card>
        <Card className="p-0 md:w-1/2 ">
          <div
            className="flex items-center gap-4 justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
            <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              35%
            </p>
            <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
              общий % достижения целей
            </p>
          </div>
          <div
            className={`overflow-hidden p-6 ${extended ? '' : 'max-h-[260px]'}`}
          >
            <BarList data={pages} valueFormatter={valueFormatter}/>
          </div>
        </Card>
      </div>
    </div>
  )
}
