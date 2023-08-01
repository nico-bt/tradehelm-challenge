"use client"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import styles from "./header.module.css"
import LogoutIcon from "./icons/LogoutIcon"

export default function Header() {
  const { user, logout } = useContext(UserContext)

  return (
    <nav className={styles.header}>
      <img src="/Kopius_Logo_Dark.png" className={styles.logo} />
      {user && (
        <ul>
          <li>{user.email}</li>
          <li className={styles.logoutBtn} onClick={() => logout()}>
            <LogoutIcon />
            <span style={{ fontSize: "0.75rem" }}>Log out</span>
          </li>
        </ul>
      )}
    </nav>
  )
}
