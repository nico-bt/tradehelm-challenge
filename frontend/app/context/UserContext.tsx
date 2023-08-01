"use client"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
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
  const signup = async ({ email, password }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/signup`, {
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
    } finally {
      setIsLoading(false)
    }
  }

  // Login
  //-----------------------------------------
  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/login`, {
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
        // setError(json.error)
        return json.error
      }
    } catch (err) {
      setError(err)
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
