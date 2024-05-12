export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Finapp",
  description:
    "Финансовое приложение",
  mainNav: [
    {
      title: "Цели",
      href: "/goals",
    },
    {
      title: "Транзакции",
      href: "/transactions",
    },
    {
      title: "Бюджеты",
      href: "/budgets",
    },
    {
      title: "Фин. инструменты",
      href: "/fin_tools",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "https://ui.shadcn.com",
  },
}
