"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function IndexPage() {
  const schema = z.object({
    mail: z.string().email("Введите корректный адрес электронной почты"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <section className="grid h-[90vh] grid-flow-col xl:grid-cols-2">
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button variant="secondary" className="bg-slate-400 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800" asChild>
          <Link href="/auth/login" className="w-60 text-white">
            Войти
          </Link>
        </Button>
      </div>
      <div className="container grid max-w-lg items-center gap-6 pb-8 pt-6 md:py-10 xl:max-w-2xl">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tighter sm:text-2xl md:text-4xl md:font-extrabold">
            Забыли пароль?
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
                          {...register("mail")}
                          />
                        <p className="mt-1 text-sm text-gray-500">
                        Укажите адрес электронной почты, связанный с вашей учетной записью, для восстановления пароля.
                        </p>
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
