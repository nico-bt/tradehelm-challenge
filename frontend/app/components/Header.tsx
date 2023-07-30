import styles from "./header.module.css"

export default function Header() {
  return (
    <nav className={styles.header}>
      <img src="/Kopius_Logo_Dark.png" className={styles.logo} />
    </nav>
  )
}
