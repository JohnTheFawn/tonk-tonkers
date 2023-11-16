import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/">
          <p>
            Tonk Tonkers | <code className={styles.code}>src/app/page.tsx</code>
          </p>
        </Link>
      </div>
      <div className={styles.description}>
        <Link href="/fflogs">
          <p>
            FF Logs | <code className={styles.code}>src/app/fflogs/page.tsx</code> 
          </p>
        </Link>
      </div>
    </main>
  )
}
