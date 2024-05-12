"use client"

import * as React from "react"
import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import kyInstance from "@/utils/api";
import {useRouter} from "next/navigation";

export default function IndexPage() {
  const router = useRouter()

  const schema = z.object({
    email: z.string().email("Введите корректный адрес электронной почты"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  });

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response: AuthResponseInterface = await kyInstance.post('auth/login', {
        json: data,
      }).json();
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <section className="grid h-[90vh] grid-flow-col xl:grid-cols-2">
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button variant="secondary"
                className="bg-slate-400 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800" asChild>
          <Link href="/auth/reg" className="w-60 text-white">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col gap-1 space-y-1.5">
                    <div className="flex flex-col gap-5">
                      <div className="basis-1/2">
                        <Label htmlFor="email">Почта</Label>
                        <Input
                          id="email"
                          type="eemail"
                          placeholder="pochta@email.ru"
                          autoComplete="eemail"
                          {...register("email")}
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
                          required
                          {...register("password")}
                        />
                        {errors.password && typeof errors.password.message === 'string' && (
                          <p className="mt-1 text-sm text-gray-500">
                            {errors.password.message}
                          </p>
                        )}
                        <Link href="/auth/forgot" className="text-sm text-gray-500">
                          Забыли пароль?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-2 w-full xl:mt-6">Продолжить</Button>
              </form>
            </CardContent>
          </Card>
          <p className="mt-2 text-sm text-gray-500 xl:hidden">
            Нет аккаунта?{" "}
            <Link href="/auth/reg" className="font-bold">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
