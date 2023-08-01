import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import { UserContextProvider } from "./context/UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Supermarket List",
  description: "Hola, haciendo challenge para postular",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <Header />
          <main>{children}</main>
        </UserContextProvider>
      </body>
    </html>
  )
}
