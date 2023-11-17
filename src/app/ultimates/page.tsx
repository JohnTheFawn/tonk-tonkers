import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/ultimates/top">
          <p>
            The Omega Protocol (Ultimate) | <code className={styles.code}>src/app/ultimates/top/page.tsx</code>
          </p>
        </Link>
      </div>
    </main>
  )
}
