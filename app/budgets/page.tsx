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

export default function Budgets() {
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">
          Бюджеты
        </h1>
        <Button variant="default">
          Добавить
        </Button>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Новый бюджет</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Название</label>
                  <input type="text" id="name" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Цель</label>
                  <input type="text" id="name" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Сумма</label>
                  <input type="text" id="name" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Фин.инструменты</label>
                  <select
                      id="instrument"
                      className="mt-1 p-2 border rounded-md w-full"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Описание</label>
                  <input type="text" id="name" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="flex justify-end">
                  <Button variant="default">Сохранить</Button>
                </div>
              </form>
            </div>
          </div>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>На компьютер</TableCell>
              <TableCell>100 000Р</TableCell>
              <TableCell>Вклад</TableCell>
              <TableCell>Компьютер</TableCell>
              <TableCell className="flex gap-3">
                <Pencil className="h-5 w-5 hover:text-gray-700" />
                <Trash2 className="h-5 w-5 hover:text-gray-700" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>На машину</TableCell>
              <TableCell>1 000 000Р</TableCell>
              <TableCell>Облигации</TableCell>
              <TableCell>Машина</TableCell>
              <TableCell className="flex gap-3">
                {/* <FileEditIcon className="mr-2 inline h-5 w-5 text-gray-500 hover:text-gray-700" />
                <DeleteIcon className="inline h-5 w-5 text-gray-500 hover:text-gray-700" /> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>На дом</TableCell>
              <TableCell>400 000Р</TableCell>
              <TableCell>Облигации</TableCell>
              <TableCell>Дом</TableCell>
              <TableCell className="flex gap-3">
                {/* <FileEditIcon className="mr-2 inline h-5 w-5 text-gray-500 hover:text-gray-700" />
                <DeleteIcon className="inline h-5 w-5 text-gray-500 hover:text-gray-700" /> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
