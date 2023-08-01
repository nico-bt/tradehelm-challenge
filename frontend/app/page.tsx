"use client"

import styles from "./page.module.css"
import Item from "./components/Item"
import { useContext, useEffect, useState } from "react"
import AddItemModal from "./components/AddItemModal"
import { UserContext } from "./context/UserContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, isLoading, error } = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  // If there is no user credentials (a jwt is set on a cookie), redirect to signup.
  //-----------------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signup")
      }
    }
  }, [user, isLoading])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Ups... Something went wrong. Please try again</h1>
  }

  if (user) {
    return (
      <>
        <h1>Supermarket List</h1>

        <div className={styles.itemsContainer}>
          <Item />
          <Item />
          <Item />
          <Item />
          <button className={styles.btnAdd} onClick={() => setOpen(true)}>
            Add Item
          </button>
        </div>

        <AddItemModal open={open} setOpen={setOpen} />
      </>
    )
  }
}
