"use client"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { BarList } from '@tremor/react';
import { useState } from 'react';

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

const valueFormatter = (number:number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Goals() {
  const [extended, setExtended] = useState(false);
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-semibold">Цели</h1>
        <Dialog>
          <DialogTrigger>
            <Button variant="default">Добавить</Button>
          </DialogTrigger>
          <DialogContent> 
            <DialogHeader>
              <DialogTitle>Цель</DialogTitle>
            </DialogHeader>
              <Label htmlFor="name">Название</Label>
              <Input id="name" type="text" placeholder="название" />
              <Label htmlFor="desc">Описание</Label>
              <Input id="desc" type="text" placeholder="описание" />
              <Label htmlFor="amount">Сумма</Label>
              <Input id="amount" type="number" placeholder="1 000 000" />
              <Label htmlFor="period">Бюджеты</Label>
              <Select> 
                  <SelectTrigger>
                    <SelectValue placeholder="Выберете бюджеты" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="1">Бюджет 1</SelectItem>
                      <SelectItem value="2">Бюджет 2</SelectItem>
                      <SelectItem value="3">Бюджет 3</SelectItem>
                  </SelectContent>
              </Select>
              <Button variant="default" className="mt-4 w-full">Сохранить</Button>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Машина</TableCell>
              <TableCell>1.500.000Р</TableCell>
              <TableCell>1.000.000Р</TableCell>
              <TableCell>Бюджеты 1,2,3</TableCell>
              <TableCell className="flex gap-3">
                <Pencil className="h-5 w-5 hover:text-gray-700" />
                <Trash2 className="h-5 w-5 hover:text-gray-700" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Дом</TableCell>
              <TableCell>10.500.000Р</TableCell>
              <TableCell>1.000.000Р</TableCell>
              <TableCell>Бюджеты 1,2,3</TableCell>
              <TableCell className="flex gap-3">
                <Pencil className="h-5 w-5 hover:text-gray-700" />
                <Trash2 className="h-5 w-5 hover:text-gray-700" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Компьютер</TableCell>
              <TableCell>300.000Р</TableCell>
              <TableCell>250.000Р</TableCell>
              <TableCell>Бюджеты 1,2,3</TableCell>
              <TableCell className="flex gap-3">
                <Pencil className="h-5 w-5 hover:text-gray-700" />
                <Trash2 className="h-5 w-5 hover:text-gray-700" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Card className="p-0 md:w-1/2 ">
        <div className="flex items-center gap-4 justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
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
          <BarList data={pages} valueFormatter={valueFormatter} />
        </div>
      </Card>
      </div>
    </div>
  )
}
