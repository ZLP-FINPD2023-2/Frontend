"use client"
import {Pencil, Trash2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useForm} from "react-hook-form"

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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import * as z from "zod"
import {toast} from "@/components/ui/use-toast"
import InputDate from "@/components/input-date"

const finTools = [
  {
    id: 1,
    name: 'Вклад',
    frequency: "Ежемесячно",
    profit: "1.13",
    start_date: "9.10.2023",
    end_date: "9.10.2024"
  },
  {
    id: 2,
    name: 'Облигация',
    frequency: "Ежемесячно",
    profit: "1.15",
    start_date: "9.10.2023",
    end_date: "9.10.2024"
  },
]


const FormSchema = z.object({
  start: z.date({
    required_error: "A date of birth is required.",
  }),
  end: z.date({
    required_error: "A date of birth is required.",
  }),
})

export default function Fin_tools() {
  const form = useForm()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">
          Финансовые инструменты
        </h1>
        <Form {...form}>
          <Dialog>
            <DialogTrigger>
              <Button variant="default">Добавить</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Финансовые инструменты</DialogTitle>
              </DialogHeader>
              <Label htmlFor="name">Название</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберете инструмент"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">Вклад</SelectItem>
                  <SelectItem value="bond">Облигация</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="period">Периодичность</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберете период"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Ежемесячно</SelectItem>
                  <SelectItem value="year">Ежегодно</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="coefficient">Коэффициент прибыли</Label>
              <Input id="coefficient" type="number" placeholder="1.15"/>
              <InputDate form={form} field="start" label="Дата начала"/>
              <InputDate form={form} field="end" label="Дата конца"/>
              <Button variant="default" className="mt-4 w-full">Сохранить</Button>
            </DialogContent>
          </Dialog>
        </Form>
      </div>
      <Card className="h-screen rounded-3xl p-6 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">№</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Периодичность</TableHead>
              <TableHead>Коэф. прибыли</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата конца</TableHead>
              <TableHead>Подробнее</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finTools.length > 0 ? finTools.map((finTool) => (
                <TableRow>
                  <TableCell>{finTool.id}</TableCell>
                  <TableCell>{finTool.name}</TableCell>
                  <TableCell>{finTool.frequency}</TableCell>
                  <TableCell>{finTool.profit}</TableCell>
                  <TableCell>{finTool.start_date}</TableCell>
                  <TableCell>{finTool.end_date}</TableCell>
                  <TableCell className="flex gap-3">
                    <Pencil className="h-5 w-5 hover:text-gray-700"/>
                    <Trash2 className="h-5 w-5 hover:text-gray-700"/>
                  </TableCell>
                </TableRow>
              ))
              :
              <span className="">Финансовых инструментов пока нет</span>
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
