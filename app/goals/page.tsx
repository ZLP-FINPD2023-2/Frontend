"use client"
import {Pencil, Trash2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog"

import {BarList} from '@tremor/react';
import * as React from 'react';
import {useState} from 'react';
import {FieldValues, SubmitHandler} from "react-hook-form";
import kyInstance from "@/utils/api";
import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query'
import GoalForm from "@/components/goal-form";
import isAuth from "@/app/auth/isAuth/isAuth";


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

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const fetchGoals = (): Promise<GoalInterface[]> =>
  kyInstance.get('goal').then((response) => response.json())


const Goals = () => {
  const queryClient = useQueryClient()
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
  const deleteGoal = (id: number) => {
    kyInstance.delete(`goal/${id}`)
    mutation.mutate()
  }
  const updateGoal: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formDataToSend = {
        target_amount: data.target_amount,
        title: data.title,
      };
      const response = await kyInstance.patch(`goal/${data.id}`, {
        json: formDataToSend,
      }).json();
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await kyInstance.post('goal', {
        json: data,
      });
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Цели</h1>
        <Dialog>
          <DialogTrigger>
            <Button variant="default">Добавить</Button>
          </DialogTrigger>
          <DialogContent>
            <GoalForm onSubmit={onSubmit}/>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative flex flex-col-reverse items-start gap-4 md:flex-row">
        <Card className="h-screen flex-1 rounded-3xl p-6 md:w-1/2 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">№</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? data.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell>{goal.id}</TableCell>
                    <TableCell>{goal.title}</TableCell>
                    <TableCell>{goal.target_amount}</TableCell>
                    <TableCell className="flex gap-3">
                      <Dialog>
                        <DialogTrigger>
                          <Pencil className="size-5 hover:text-gray-700"/>
                        </DialogTrigger>
                        <DialogContent>
                          <GoalForm onSubmit={updateGoal}
                                    defaultValues={{target_amount: goal.target_amount, title: goal.title, id: goal.id}}/>
                        </DialogContent>
                      </Dialog>
                      < Trash2 className="size-5 hover:text-gray-700" onClick={() => deleteGoal(goal.id)}/>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Целей пока нет</TableCell>
                </TableRow>
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

export default isAuth(Goals);
