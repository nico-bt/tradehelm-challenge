"use client"
import { useContext, useState } from "react"
import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import styles from "./item.module.css"
import { ItemsContext } from "../context/ItemsContext"
import EditItemModal from "./EditItemModal"

export default function Item({ itemData }) {
  const { deleteItem } = useContext(ItemsContext)
  const [openEditModal, setOpenEditModal] = useState(false)

  return (
    <>
      <div className={styles.item}>
        <p>{itemData.item}</p>
        <div className={styles.btnsContainer}>
          <EditIcon className={styles.editBtn} onClick={() => setOpenEditModal(true)} />
          <DeleteIcon
            className={styles.deleteBtn}
            onClick={() => {
              deleteItem(itemData)
            }}
          />
        </div>
      </div>

      <EditItemModal open={openEditModal} setOpen={setOpenEditModal} itemData={itemData} />
    </>
  )
}
