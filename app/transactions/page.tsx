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
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import TransactionForm from "@/components/transactions-form";
import isAuth from "@/app/auth/isAuth/isAuth";


const fetchTransactions = (): Promise<TransactionInterface[]> =>
  kyInstance.get('trx').then((response) => response.json())

const Transaction = () => {
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
      const formDataToSend = {
        title: data.title,
        amount: data.amount,
      };
      await kyInstance.patch(`trx/${data.id}`, {
        json: formDataToSend,
      }).json();
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let newDate = `${('0' + data.date.getDate()).slice(-2)}-${('0' + (data.date.getMonth() + 1)).slice(-2)}-${data.date.getFullYear()}`
      const formDataToSend = {
        title: data.title,
        amount: data.amount,
        date: newDate,
        budget_from: Number(data.budget_from),
        budget_to: Number(data.budget_to),
      };
      console.log(formDataToSend)
      await kyInstance.post('trx', {
        json: formDataToSend,
      });
      mutation.mutate()
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Транзакции</h1>
        <Dialog>
          <DialogTrigger>
            <Button variant="default">Добавить</Button>
          </DialogTrigger>
          <DialogContent>
            <TransactionForm onSubmit={onSubmit}/>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="h-screen rounded-3xl p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">№</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Бюджет списания</TableHead>
              <TableHead>Бюджет поступления</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? data.map((transaction) => (
                <TableRow>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell
                    className={transaction.amount > 0 ? `text-green-500` : "text-red-500"}>{transaction.amount > 0 ? `+${transaction.amount} ₽` : `${transaction.amount} ₽`}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.budget_from}</TableCell>
                  <TableCell>{transaction.budget_to}</TableCell>

                  <TableCell className="flex gap-3">
                    <Dialog>
                      <DialogTrigger>
                        <Pencil className="size-5 hover:text-gray-700"/>
                      </DialogTrigger>
                      <DialogContent>
                        <TransactionForm onSubmit={updateTransaction}
                                         defaultValues={{
                                           amount: transaction.amount,
                                           title: transaction.title,
                                           id: transaction.id,
                                           date: transaction.date,
                                           budget_from: transaction.budget_from,
                                           budget_to: transaction.budget_to
                                         }}/>
                      </DialogContent>
                    </Dialog>
                    <Trash2 onClick={() => deleteTransaction(transaction.id)} className="size-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell colSpan={8} className="text-center">Транзакций пока нет</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default isAuth(Transaction);
