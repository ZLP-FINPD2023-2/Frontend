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

const transactions = [
  {
    id: 1,
    title: 'Перевод на машину',
    amount: 100000,
    date: "9.10.2023 21:13",
    frequency: "Ежемесячно",
    duration: "5 месяцев",
    budget: "Машина"
  },
  {
    id: 2,
    title: 'Аренда квартиры',
    amount: -55000,
    date: "8.10.2023 21:13",
    frequency: "Ежемесячно",
    duration: "24 месяца",
    budget: ""
  },
  {
    id: 3,
    title: 'Зарплата',
    amount: 200000,
    date: "30.09.2023 21:13",
    frequency: "Ежемесячно",
    duration: "36 месяцев",
    budget: ""
  },
  {
    id: 4,
    title: 'Акции',
    amount: 30000,
    date: "9.10.2023 21:13",
    frequency: "Ежемесячно",
    duration: "6 месяцев",
    budget: "Дом"
  },
]

export default function Transaction() {
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
            {transactions.length > 0 ? transactions.map((transaction) => (
                <TableRow>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell
                    className={transaction.amount > 0 ? `text-green-500` : "text-red-500"}>{transaction.amount > 0 ? `+${transaction.amount}Р` : `${transaction.amount}Р`}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.frequency}</TableCell>
                  <TableCell>{transaction.duration}</TableCell>
                  <TableCell>{transaction.budget ? transaction.budget : "-"}</TableCell>
                  <TableCell className="flex gap-3">
                    <Pencil className="h-5 w-5 hover:text-gray-700"/>
                    <Trash2 className="h-5 w-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              :
              <span className="">Транзакций пока нет</span>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
