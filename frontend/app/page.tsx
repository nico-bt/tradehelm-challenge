"use client"

import styles from "./page.module.css"
import Item from "./components/Item"
import { useContext, useEffect, useState } from "react"
import AddItemModal from "./components/AddItemModal"
import { UserContext } from "./context/UserContext"
import { useRouter } from "next/navigation"
import { ItemsContext } from "./context/ItemsContext"

export default function Home() {
  const { user, isLoading, error } = useContext(UserContext)
  const { items, itemsApiError, loadingItems } = useContext(ItemsContext)
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

  if (error || itemsApiError) {
    return (
      <h1 className={styles.errorConnection}>
        <span>Ups... Something went wrong with the connection.</span>
        <span>Please try again</span>
      </h1>
    )
  }

  if (user) {
    return (
      <>
        <h1>Supermarket List</h1>
        {items.length > 0 && (
          <h3>
            {items.length} item{items.length > 1 && "s"}
          </h3>
        )}

        <div className={styles.itemsContainer}>
          {items.length > 0 ? (
            items.map((item) => <Item key={item._id} itemData={item} />)
          ) : (
            <div className={styles.emptyList}>
              {loadingItems ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p>Empty list</p>
                  <p>Add your items</p>
                </>
              )}
            </div>
          )}

          <button className={styles.btnAdd} onClick={() => setOpen(true)}>
            Add Item
          </button>
        </div>

        <AddItemModal open={open} setOpen={setOpen} />
      </>
    )
  }
}
