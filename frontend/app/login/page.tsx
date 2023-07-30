"use client"
import React from "react"
import style from "./style.module.css"
import { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import Link from "next/link"
// import { UserContext } from "../../context/UserContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false)
  const [loading, setLoading] = useState(false)

  // const { login } = useContext(UserContext)

  const emailInputRef = useRef()
  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  // Handle submit signup
  //---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setLoginError("Enter all fields")
      return
    }

    setLoading(true)
    // const err = await signup({ email, password })
    if (err) {
      setLoginError(err)
    }
    setPassword("")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={style.signup} id="signup-form">
      <h2>Log In</h2>

      {loginError && <div className={style.error}>{loginError}</div>}

      <label htmlFor="login-email">Email</label>
      <input
        type="text"
        name="email"
        id="login-email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        ref={emailInputRef}
      />

      <label htmlFor="login-password">Password</label>
      <input
        type="password"
        name="password"
        id="login-password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className={style.submit} disabled={loading}>
        Log In
      </button>

      <div className={style.signupChange}>
        Don't have an account? <Link href={"/signup"}>Sign Up</Link>
      </div>
    </form>
  )
}
