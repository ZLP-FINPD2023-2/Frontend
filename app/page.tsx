"use client"

import {
  AreaChart,
  BadgeDelta,
  DonutChart,
  Legend,
  ProgressBar,
} from "@tremor/react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const income = [
  {
    name: "ЗП",
    fraction: 59800,
  },
  {
    name: "Акции",
    fraction: 4567,
  },
  {
    name: "Облигации",
    fraction: 3908,
  },
  {
    name: "Золото",
    fraction: 2400,
  },
  {
    name: "Доллары",
    fraction: 1908,
  },
  {
    name: "Евро",
    fraction: 1398,
  },
]
const chartdata = [
  {
    date: "Jan 22",
    Евро: 100,
    Доллары: 98,
  },
  {
    date: "Jan 23",
    Евро: 110,
    Доллары: 95,
  },
  {
    date: "Jan 24",
    Евро: 105,
    Доллары: 99,
  },
  {
    date: "Jan 25",
    Евро: 107,
    Доллары: 101,
  },
  {
    date: "Jan 26",
    Евро: 150,
    Доллары: 120,
  },
  {
    date: "Jan 27",
    Евро: 140,
    Доллары: 115,
  },
]

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const categories = income.map((item) => item.name)
const valueFormatter = (number) =>
  `₽ ${new Intl.NumberFormat("us").format(number).toString()}`
export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid-row-2 grid grid-cols-[1fr,1fr,1fr] gap-6">
        <Card className="p-6">
          <CardTitle className="text-2xl font-semibold">Бюджет</CardTitle>
          <CardContent className="mt-6">
            <BadgeDelta deltaType="moderateIncrease">5.97%</BadgeDelta>
            <p className="text-4xl font-semibold">700 000₽</p>
            <div className="my-6 flex text-sm text-gray-500">
              <p className="">60,29%(700 000 ₽)</p>
              <p>1 160 000 ₽</p>
            </div>
            <ProgressBar
              value={45}
              color="blue"
              showAnimation={true}
              className="mt-3"
            />
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardTitle className="text-center text-2xl font-semibold">
            Распеределение средств
          </CardTitle>
          <CardContent className="mt-6 flex">
            <DonutChart
              animationDuration={1000}
              showAnimation={true}
              showLabel={true}
              className=""
              data={income}
              category="fraction"
              index="name"
              valueFormatter={valueFormatter}
              colors={["cyan", "sky", "blue", "indigo", "violet", "purple"]}
            />
            <Legend
              className="max-w-[100px]"
              categories={categories}
              colors={["cyan", "sky", "blue", "indigo", "violet", "purple"]}
            />
          </CardContent>
        </Card>
        <Card className="row-span-2">
          <CardTitle className="p-6 text-2xl font-semibold">
            Димамика роста фин. инструментов
          </CardTitle>
          <CardContent className="flex p-0">
            <AreaChart
              className="mt-4 h-[800px]"
              data={chartdata}
              index="date"
              categories={["Евро", "Доллары"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </CardContent>
        </Card>
        <Card className="col-start-1 col-end-3 p-6">
          <CardTitle className="text-2xl font-semibold">
            Димамика роста фин. инструментов
          </CardTitle>
          <CardContent className="mt-6 flex">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
