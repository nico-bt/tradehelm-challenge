"use client"
import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { UserContext } from "./UserContext"

export const ItemsContext = createContext()

export function ItemsContextProvider({ children }) {
  const { user } = useContext(UserContext)
  const [items, setItems] = useState([])

  const getAllItems = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/items`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setItems(data)
      } else {
        throw new Error()
      }
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    if (user) {
      getAllItems()
    }
  }, [user])

  const addItem = async (newItem) => {
    try {
      const response = await fetch("http://localhost:8000/api/items", {
        method: "POST",
        body: JSON.stringify({ itemData: newItem }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      const newItemAdded = await response.json()

      if (response.ok) {
        setItems((prev) => [...prev, newItemAdded])
      } else {
        throw new Error()
      }
    } catch (error) {
      return error
    }
  }

  const deleteItem = async (itemToDelete) => {
    try {
      const response = await fetch("http://localhost:8000/api/items/" + itemToDelete._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemToDelete._id))
      } else {
        throw new Error()
      }
    } catch (error) {
      return error
    }
  }

  const editItem = async ({ id, newItem }) => {
    console.log({ id, itemData: newItem })
    try {
      const response = await fetch("http://localhost:8000/api/items/" + id, {
        method: "PATCH",
        body: JSON.stringify({ itemData: newItem }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      const newItemEdited = await response.json()
      console.log(newItemEdited)
      if (response.ok) {
        setItems((prev) => prev.map((item) => (item._id === id ? newItemEdited : item)))
      } else {
        throw new Error()
      }
    } catch (error) {
      return error
    }
  }

  return (
    <ItemsContext.Provider value={{ items, getAllItems, addItem, deleteItem, editItem }}>
      {children}
    </ItemsContext.Provider>
  )
}
