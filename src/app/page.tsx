import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <Link href="/">Tonk Tonkers <code className={styles.code}>src/app/page.tsx</code></Link>
        </p>
      </div>
      <div className={styles.description}>
        <p>
          <Link href="/fflogs">FF Logs <code className={styles.code}>src/app/fflogs/page.tsx</code></Link> 
        </p>
      </div>
    </main>
  )
}
