"use client"
import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { UserContext } from "./UserContext"
import { ItemType } from "../components/Item"

// Sin tipado:
// export const ItemsContext = createContext()

export const ItemsContext = createContext<{
  items: ItemType[]
  getAllItems: () => Promise<any> // Return"any" para las otras funciones
  addItem: (newItem: string) => Promise<any>
  deleteItem: (itemToDelete: ItemType) => Promise<any>
  editItem: ({ id, newItem }: { id: string; newItem: string }) => Promise<any>
}>({
  items: [],
  getAllItems: async () => {}, // Func vacía, ya que el tipo de retorno es "any"
  addItem: async (newItem: string) => {},
  deleteItem: async (itemToDelete: ItemType) => {},
  editItem: async ({ id, newItem }: { id: string; newItem: string }) => {},
})

export function ItemsContextProvider({ children }) {
  const { user } = useContext(UserContext)
  const [items, setItems] = useState<ItemType[]>([])
  const [itemsApiError, setItemsApiError] = useState(false)

  const getAllItems = async () => {
    setItemsApiError(false)
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
      setItemsApiError(true)
      return err
    }
  }

  useEffect(() => {
    if (user) {
      getAllItems()
    }
  }, [user])

  const addItem = async (newItem: string) => {
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

  const deleteItem = async (itemToDelete: ItemType) => {
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

  const editItem = async ({ id, newItem }: { id: string; newItem: string }) => {
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
    <ItemsContext.Provider
      value={{ items, getAllItems, addItem, deleteItem, editItem, itemsApiError }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
