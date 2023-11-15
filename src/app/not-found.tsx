import styles from './not-found.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          404 | This page could not be found
          <br/>
          <br/>
          <Link href="/">Return Home</Link>
        </p>
      </div>
    </main>
  )
}
