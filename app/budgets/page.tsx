"use client"
import {Pencil, Trash2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BudgetForm from "@/components/budget-form";
import {FieldValues, SubmitHandler} from "react-hook-form";
import kyInstance from "@/utils/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import isAuth from "@/app/auth/isAuth/isAuth";

const fetchBudgets = (): Promise<BudgetInterface[]> =>
  kyInstance.get('budget').then((response) => response.json())


const Budgets = () => {
  const queryClient = useQueryClient()
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
  })

  const mutation = useMutation({
    mutationFn: fetchBudgets,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['budgets']})
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const deleteBudget = (id: number) => {
    kyInstance.delete(`budget/${id}`)
    mutation.mutate()
  }
  const updateBudget: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formDataToSend = {
        id: data.id,
        title: data.title,
        goal_id: Number(data.goal),
      };
      const response = await kyInstance.patch(`budget/${data.id}`, {
        json: formDataToSend,
      }).json();
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formDataToSend = {
        title: data.title,
        goal_id: Number(data.goal),
      };
      await kyInstance.post('budget', {
        json: formDataToSend,
      });
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">
          Бюджеты
        </h1>
        <Dialog>
          <DialogTrigger>
            <Button variant="default">Добавить</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый бюджет</DialogTitle>
            </DialogHeader>
            <BudgetForm onSubmit={onSubmit}/>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="h-screen rounded-3xl p-6 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">№</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Фин. инструменты</TableHead>
              <TableHead>Цель</TableHead>
              <TableHead>Подробнее</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? data.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.id}</TableCell>
                  <TableCell>{budget.title}</TableCell>
                  <TableCell>{budget.goal}</TableCell>
                  <TableCell className="flex gap-3">
                    <Dialog>
                      <DialogTrigger>
                        <Pencil className="size-5 hover:text-gray-700"/>
                      </DialogTrigger>
                      <DialogContent>
                        <BudgetForm onSubmit={updateBudget}
                                    defaultValues={{goal: budget.goal, title: budget.title, id: budget.id}}/>
                      </DialogContent>
                    </Dialog>
                    <Trash2 onClick={() => deleteBudget(budget.id)} className="size-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell colSpan={6} className="text-center">Бюджетов пока нет</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
export default Budgets;
