"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export default function IndexPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

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
    <section className="grid h-screen grid-flow-col xl:grid-cols-2">
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button asChild>
          <Link href="/reg" className="w-60 bg-gray-400">
            Зарегистрироваться
          </Link>
        </Button>
      </div>
      <div className="container grid max-w-lg items-center gap-6 pb-8 pt-6 md:py-10 xl:max-w-2xl">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tighter sm:text-4xl md:text-6xl md:font-extrabold">
            Вход
          </h1>
          <Card className="mt-5 w-full py-6 pb-0">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col gap-1 space-y-1.5">
                    <div className="flex flex-col gap-5">
                      <div className="basis-1/2">
                        <Label htmlFor="mail">Почта</Label>
                        <Input
                          id="mail"
                          type="email"
                          placeholder="pochta@mail.ru"
                          autoComplete="email"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Введите свою почту
                        </p>
                      </div>
                      <div className="basis-1/2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Введите пароль"
                          autoComplete="password"
                        />
                        <Link href={""} className="text-sm text-gray-500">
                          Забыли пароль?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <p className="mt-2 text-sm text-gray-500 xl:hidden">
            Нет аккаунта?{" "}
            <Link href="/reg" className="font-bold">
            Зарегистрироваться
            </Link>
          </p>
          <Button className="mt-2 w-full xl:mt-6">Продолжить</Button>
        </div>
      </div>
    </section>
  )
}
