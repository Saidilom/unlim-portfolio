import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Портфолио личный сайт Unlim",
  description:
    "Full Stack разработчик с 3+ годами опыта создания веб-приложений. Специализируюсь на современных технологиях и создании качественных решений.",
  keywords: "Full Stack Developer, React, Next.js, TypeScript, веб-разработка, портфолио",
  authors: [{ name: "Unlim_Lawe" }],
  creator: "Unlim_Lawe",
  openGraph: {
    title: "Портфолио личный сайт Unlim",
    description: "Full Stack разработчик с 3+ годами опыта создания веб-приложений",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Портфолио личный сайт Unlim",
    description: "Full Stack разработчик с 3+ годами опыта создания веб-приложений",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
