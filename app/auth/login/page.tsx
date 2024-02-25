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

  return (
    <section className="grid h-[90vh] grid-flow-col xl:grid-cols-2">
      <div className="hidden place-content-center bg-gray-200 dark:bg-slate-950 xl:grid">
        <Button variant="secondary" asChild>
          <Link href="/auth/reg" className="w-60">
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
                        <Link href="/auth/forgot" className="text-sm text-gray-500">
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
            <Link href="/auth/reg" className="font-bold">
              Зарегистрироваться
            </Link>
          </p>
          <Button className="mt-2 w-full xl:mt-6">Продолжить</Button>
        </div>
      </div>
    </section>
  )
}
