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
import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query'
import kyInstance from "@/utils/api";
import * as React from "react";
import {FieldValues, SubmitHandler} from "react-hook-form";

// const transactions = [
//   {
//     id: 1,
//     title: 'Перевод на машину',
//     amount: 100000,
//     date: "9.10.2023 21:13",
//     frequency: "Ежемесячно",
//     duration: "5 месяцев",
//     budget: "Машина"
//   },
//   {
//     id: 2,
//     title: 'Аренда квартиры',
//     amount: -55000,
//     date: "8.10.2023 21:13",
//     frequency: "Ежемесячно",
//     duration: "24 месяца",
//     budget: ""
//   },
//   {
//     id: 3,
//     title: 'Зарплата',
//     amount: 200000,
//     date: "30.09.2023 21:13",
//     frequency: "Ежемесячно",
//     duration: "36 месяцев",
//     budget: ""
//   },
//   {
//     id: 4,
//     title: 'Акции',
//     amount: 30000,
//     date: "9.10.2023 21:13",
//     frequency: "Ежемесячно",
//     duration: "6 месяцев",
//     budget: "Дом"
//   },
// ]

const fetchTransactions = (): Promise<TransactionInterface[]> =>
  kyInstance.get('trx').then((response) => response.json())

export default function Transaction() {
  const queryClient = useQueryClient()
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })

  const mutation = useMutation({
    mutationFn: fetchTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']})
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const deleteTransaction = (id: number) => {
    kyInstance.delete(`trx/${id}`)
    mutation.mutate()
  }
  const updateTransaction: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data)
      const formDataToSend = {
        title: data.title,
        amount: data.amount,
        date: data.date,
        budget_from: data.budget_from,
        budget_to: data.budget_to,
      };
      const response = await kyInstance.patch(`trx/${data.id}`, {
        json: formDataToSend,
      }).json();
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-2xl font-semibold">Транзакции</h1>
      <Card className="h-screen rounded-3xl p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">№</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Частота</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Бюджет</TableHead>
              <TableHead>Подробнее</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/*{data.map((transaction) => (*/}
            {/*  <TableRow>*/}
            {/*    <TableCell>{transaction.id}</TableCell>*/}
            {/*    <TableCell>{transaction.title}</TableCell>*/}
            {/*    <TableCell*/}
            {/*      className={transaction.amount > 0 ? `text-green-500` : "text-red-500"}>{transaction.amount > 0 ? `+${transaction.amount}Р` : `${transaction.amount}Р`}</TableCell>*/}
            {/*    <TableCell>{transaction.date}</TableCell>*/}
            {/*    <TableCell>{transaction.budget_from}</TableCell>*/}
            {/*    <TableCell>{transaction.budget_to}</TableCell>*/}
            {/*    /!*<TableCell>{transaction.frequency}</TableCell>*!/*/}
            {/*    /!*<TableCell>{transaction.duration}</TableCell>*!/*/}
            {/*    /!*<TableCell>{transaction.budget ? transaction.budget : "-"}</TableCell>*!/*/}
            {/*    <TableCell className="flex gap-3">*/}
            {/*      <Pencil className="h-5 w-5 hover:text-gray-700"/>*/}
            {/*      <Trash2 className="h-5 w-5 hover:text-gray-700"/>*/}
            {/*    </TableCell>*/}
            {/*  </TableRow>*/}
            {/*))}*/}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
