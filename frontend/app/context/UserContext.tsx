"use client"
import { createContext, useEffect, useState } from "react"

interface UserType {
  email: string
  token: string
}

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in (saved credentials as jwt in localStorage)
  //--------------------------------------------------------------------------
  useEffect(() => {
    const userInLocal = localStorage.getItem("supermarketUser")

    if (userInLocal) {
      const userInLocalJson = JSON.parse(userInLocal)
      setUser(userInLocalJson)
    }
    setIsLoading(false)
  }, [])

  // Signup
  //-----------------------------------------------------------------------------
  const signup = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/signup`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        const { user, userToken } = await response.json()
        if (user) {
          setError(false)
          setUser({ email: user.email, token: userToken })

          localStorage.setItem(
            "supermarketUser",
            JSON.stringify({ email: user.email, token: userToken })
          )
        }
      } else {
        const json = await response.json()
        return json.error
      }
    } catch (err) {
      setError(err)
      return "Connection problem. Try again please"
    } finally {
      setIsLoading(false)
    }
  }

  // Login
  //-----------------------------------------
  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const { user, userToken } = await response.json()
        if (user) {
          setError(false)
          setUser({ email: user.email, token: userToken })

          localStorage.setItem(
            "supermarketUser",
            JSON.stringify({ email: user.email, token: userToken })
          )
        }
      } else {
        const json = await response.json()
        return json.error
      }
    } catch (err) {
      setError(err)
      return "Connection problem. Try again please"
    } finally {
      setIsLoading(false)
    }
  }

  // Reset error
  //-----------------------------------------
  const resetError = () => {
    setError(false)
  }

  // Logout
  //-----------------------------------------
  const logout = async () => {
    setUser(null)
    localStorage.removeItem("supermarketUser")
  }

  return (
    <UserContext.Provider value={{ user, isLoading, error, signup, login, logout, resetError }}>
      {children}
    </UserContext.Provider>
  )
}
