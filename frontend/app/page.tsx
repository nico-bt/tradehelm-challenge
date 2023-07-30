"use client"

import styles from "./page.module.css"
import Item from "./components/Item"
import { useState } from "react"
import AddItemModal from "./components/AddItemModal"

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <main className={styles.main}>
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
    </main>
  )
}
