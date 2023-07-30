import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import styles from "./item.module.css"

export default function Item() {
  return (
    <div className={styles.item}>
      <p>Item lalalal lore</p>
      <div className={styles.btnsContainer}>
        <EditIcon className={styles.editBtn} onClick={() => {}} />
        <DeleteIcon className={styles.deleteBtn} onClick={() => {}} />
      </div>
    </div>
  )
}
