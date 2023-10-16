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
      <div className="container grid items-center gap-6 pb-8 pt-6 md:max-w-3xl md:py-10">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tighter sm:text-4xl md:text-6xl md:font-extrabold">
            Регистрация
          </h1>
          <Card className="mt-5 w-full py-6 pb-0">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col gap-1 space-y-1.5">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row">
                      <div className="basis-1/2">
                        <Label htmlFor="surname">Фамилия</Label>
                        <Input
                          className=""
                          id="surname"
                          placeholder="Иванов"
                          autoComplete="family-name"
                        />
                      </div>
                      <div className="basis-1/2">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          className=""
                          id="name"
                          placeholder="Иван"
                          autoComplete="given-name"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-5 sm:flex-row">
                      <div className="basis-1/2">
                        <Label htmlFor="patronymic">
                          Отчество{" "}
                          <span className="text-gray-500">(при наличии)</span>
                        </Label>
                        <Input id="patronymic" placeholder="Иванович" />
                      </div>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="basis-1/2"
                        >
                          <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Дата рождения</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP", {
                                            locale: ru,
                                          })
                                        ) : (
                                          <span>Укажите дату</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>
                    <div className="flex flex-col justify-between gap-5 md:flex-row 2xl:flex-col">
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
                          placeholder="Придумайте пароль"
                          autoComplete="new-password"
                        />
                        <p className="text-sm text-gray-500">
                          Минимум 8 символов
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reppassword">Пароль</Label>
                      <Input
                        id="reppassword"
                        type="password"
                        placeholder="Повторите пароль"
                        autoComplete="new-password"
                      />
                      <p className="text-sm text-gray-500">
                        Минимум 8 символов
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2 self-center pt-4 sm:self-start">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Согласен с обработкой персональных данных
            </label>
          </div>
          <Button className="mt-4 w-full">Продолжить</Button>
          <p className="text-sm text-gray-500 xl:hidden">
            Уже есть акаунт?{" "}
            <Link href="/auth" className="font-bold">
              Войти
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button asChild>
          <Link href="/auth" className="w-60 bg-gray-500 text-white">
            Войти
          </Link>
        </Button>
      </div>
    </section>
  )
}
