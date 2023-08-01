"use client"
import React from "react"
import style from "./style.module.css"
import { useEffect, useContext } from "react"
import { useState } from "react"
import Link from "next/link"
import { UserContext } from "../context/UserContext"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signupError, setSignupError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signup, user } = useContext(UserContext)

  const router = useRouter()

  // Redirect to home if user is logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  // Handle submit signup
  //---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setSignupError("Enter all fields")
      return
    }

    setLoading(true)
    const err = await signup({ email, password })
    if (err) {
      setSignupError(err)
    }
    setPassword("")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={style.signup} id="signup-form">
      <h2>Sign up</h2>

      {signupError && <div className={style.error}>{signupError}</div>}

      <label htmlFor="signup-email">Email</label>
      <input
        type="text"
        name="email"
        id="signup-email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="signup-password">Password</label>
      <input
        type="password"
        name="password"
        id="signup-password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className={style.submit} disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </button>

      <div className={style.signupChange}>
        Already have an account? <Link href={"/login"}>Log In</Link>
      </div>
    </form>
  )
}
