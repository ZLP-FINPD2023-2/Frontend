"use client"

import * as React from "react"
import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"
import {format} from "date-fns"
import {ru} from "date-fns/locale"
import {CalendarIcon} from "lucide-react"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {useRouter} from "next/navigation";
import kyInstance from "@/utils/api";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const FormSchema = z.object({
  birthday: z.date({
    required_error: "Дата рождения обязательна",
  }),
  patronymic: z.string().default(""),
  email: z.string(
    {
      required_error: "Почта обязательня",
    }
  ),
  first_name: z.string(
    {
      required_error: "Имя обязательно",
    }
  ),
  gender: z.string().default("Male").refine(value => value === "Male" || value === "Female", {
    message: "Укажите пол"
  }),
  last_name: z.string(
    {
      required_error: "Фамилия обязательна",
    }
  ),
  terms: z.boolean({
    required_error: "Необходимо согласиться с обработкой персональных данных",
  }),
  password: z.string({
    required_error: "Пароль обязателен",
  }).min(6, 'Пароль должен содержать минимум 6 символов'),
  confirm_password: z.string({
    required_error: "Пароль обязателен",
  }).min(6, 'Пароль должен содержать минимум 6 символов')
}).refine((data) => data.password === data.confirm_password, {
  message: "Пароли должны совпадать",
  path: ["confirm_password"],
});

export default function IndexPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    }
  )
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let date = `${('0' + data.birthday.getDate()).slice(-2)}-${('0' + (data.birthday.getMonth() + 1)).slice(-2)}-${data.birthday.getFullYear()}`
      const formDataToSend = {
        birthday: date,
        patronymic: data.patronymic,
        email: data.email,
        first_name: data.first_name,
        gender: data.gender,
        last_name: data.last_name,
        password: data.password,
      };
      const response = await kyInstance.post('auth/register', {
        json: formDataToSend,
      });
      if (response.ok) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="basis-1/2"
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col gap-1 space-y-1.5">
                      <div className="flex flex-col justify-between gap-5 sm:flex-row">
                        <div className="basis-1/2">
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({field}) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Фамилия</FormLabel>
                                <Input id="last_name" placeholder="Иванов" value={field.value}
                                       onChange={(e) => field.onChange(e.target.value)}/>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="basis-1/2">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({field}) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Имя</FormLabel>
                                <Input id="first_name" placeholder="Иван" value={field.value}
                                       onChange={(e) => field.onChange(e.target.value)}/>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-5 sm:flex-row">
                        <FormField
                          control={form.control}
                          name="patronymic"
                          render={({field}) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Отчество (при наличии)</FormLabel>
                              <Input id="patronymic" placeholder="Иванович" value={field.value}
                                     onChange={(e) => field.onChange(e.target.value)}/>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="birthday"
                          render={({field}) => (
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
                                      <CalendarIcon className="ml-auto size-4 opacity-50"/>
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
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-5 md:flex-row 2xl:flex-col">
                        <div className="basis-1/2">
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({field}) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Пол</FormLabel>
                                <Select onValueChange={field.onChange} {...field}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="выберете пол"/>
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem  value={"Male"}>Мужчина</SelectItem>
                                      <SelectItem  value={"Female"}>Женщина</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="basis-1/2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Почта</FormLabel>
                                <Input id="email" placeholder="pochta@mail.ru" value={field.value}
                                       onChange={(e) => field.onChange(e.target.value)}/>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Введите свою почту
                          </p>
                        </div>
                        <div className="basis-1/2">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Пароль</FormLabel>
                                <Input type="password" id="password" placeholder="Придумайте пароль" value={field.value}
                                       onChange={(e) => field.onChange(e.target.value)}/>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                          <p className="text-sm text-gray-500">
                            Минимум 8 символов
                          </p>
                        </div>
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="confirm_password"
                          render={({field}) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Пароль</FormLabel>
                              <Input type="password" id="confirm_password" placeholder="Повторите пароль"
                                     value={field.value}
                                     onChange={(e) => field.onChange(e.target.value)}/>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <p className="text-sm text-gray-500">
                          Минимум 8 символов
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({field}) => (
                      <FormItem className="flex items-center space-x-2 self-center pt-4 sm:self-start">
                        <Input
                          className={"peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"}
                          type="checkbox"
                          id="terms"
                          onChange={e => field.onChange(!field.value)}
                        />
                        <FormLabel
                          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Согласен с обработкой персональных данных
                        </FormLabel>
                        {/*<FormMessage/>*/}
                      </FormItem>
                    )}
                  />
                  <Button className={`mt-4 w-full`}>Продолжить</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <p className="text-sm text-gray-500 xl:hidden">
            Уже есть акаунт?{" "}
            <Link href="/auth" className="font-bold">
              Войти
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button variant="secondary"
                className="bg-slate-400 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800" asChild>
          <Link href="/auth/login" className="w-60 text-white">
            Войти
          </Link>
        </Button>
      </div>
    </section>
  )
}
