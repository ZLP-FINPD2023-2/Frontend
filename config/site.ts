export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Finapp",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Login",
      href: "/auth/login",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "https://ui.shadcn.com",
  },
}
