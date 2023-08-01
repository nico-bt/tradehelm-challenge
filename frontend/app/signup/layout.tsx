import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up | Supermarket List",
  description: "Hola, haciendo challenge para postular",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
