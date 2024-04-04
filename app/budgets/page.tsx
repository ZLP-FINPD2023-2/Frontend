"use client"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const budgets = [
  {
    id: 1,
    name: 'На компьютер',
    cost: "100 000Р",
    fin_tool: "Вклад",
    goal: "Компьютер",
  },
  {
    id: 2,
    name: 'На машину',
    cost: "1 000 000Р",
    fin_tool: "Облигации",
    goal: "Машина",
  },
  {
    id: 3,
    name: 'На дом',
    cost: "400 000Р",
    fin_tool: "Облигации",
    goal: "Дом",
  },
]

export default function Budgets() {
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
              <Label htmlFor="name">Название</Label>
              <Input id="name" type="text" placeholder="Введите название" />
              <Label htmlFor="goal">Цель</Label>
              <Input id="goal" type="text" placeholder="Введите цель"  />
              <Label htmlFor="amount">Сумма</Label>
              <Input id="amount" type="text" placeholder="Введите сумма" />
                <Label htmlFor="instrument">
                  Фин.инструменты
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="выберите инструмент" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Ракета</SelectItem>
                    <SelectItem value="dark">Крипта</SelectItem>
                    <SelectItem value="system">Темки</SelectItem>
                  </SelectContent>
                </Select>
              <Label htmlFor="description">Описание</Label>
              <Input id="description" type="text" placeholder="Введите описание" />
              <Button variant="default" className="mt-4 w-full">Сохранить</Button>
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
            {budgets.length > 0 ? budgets.map((budget) => (
                <TableRow>
                  <TableCell>{budget.id}</TableCell>
                  <TableCell>{budget.name}</TableCell>
                  <TableCell>{budget.cost}</TableCell>
                  <TableCell>{budget.fin_tool}</TableCell>
                  <TableCell>{budget.goal}</TableCell>
                  <TableCell className="flex gap-3">
                    <Pencil className="h-5 w-5 hover:text-gray-700"/>
                    <Trash2 className="h-5 w-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              :
              <span className="">Бюджетов пока нет</span>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
