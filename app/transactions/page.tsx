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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Перевод на машину</TableCell>
              <TableCell className="text-green-500">+100 000Р</TableCell>
              <TableCell>9.10.2023 21:13</TableCell>
              <TableCell>Ежемесячно</TableCell>
              <TableCell>5 месяцев</TableCell>
              <TableCell>Машина</TableCell>
              <TableCell className="flex gap-3">
                <Pencil className="h-5 w-5 hover:text-gray-700" />
                <Trash2 className="h-5 w-5 hover:text-gray-700" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Аренда квартиры</TableCell>
              <TableCell className="text-red-500">-55 000Р</TableCell>
              <TableCell>8.10.2023 21:13</TableCell>
              <TableCell>Ежемесячно</TableCell>
              <TableCell>24 месяца</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {/* <FileEditIcon className="mr-2 inline h-5 w-5 text-gray-500 hover:text-gray-700" />
                <DeleteIcon className="inline h-5 w-5 text-gray-500 hover:text-gray-700" /> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Зарплата</TableCell>
              <TableCell className="text-green-500">+200 000Р</TableCell>
              <TableCell>30.09.2023 21:13</TableCell>
              <TableCell>Ежемесячно</TableCell>
              <TableCell>36 месяцев</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {/* <FileEditIcon className="mr-2 inline h-5 w-5 text-gray-500 hover:text-gray-700" />
                <DeleteIcon className="inline h-5 w-5 text-gray-500 hover:text-gray-700" /> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>Акции</TableCell>
              <TableCell className="text-green-500">+30 000Р</TableCell>
              <TableCell>9.10.2023 21:13</TableCell>
              <TableCell>Ежемесячно</TableCell>
              <TableCell>6 месяцев</TableCell>
              <TableCell>Дом</TableCell>
              <TableCell>
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
