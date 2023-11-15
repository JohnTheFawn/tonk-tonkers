import Image from 'next/image'
import styles from './not-found.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          404 | This page could not be found
        </p>
      </div>
    </main>
  )
}
