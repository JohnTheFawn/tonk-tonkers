import Link from 'next/link'

export default function Home() {
  return (
    <main className={"cardWrapper"}>
      <div className={"card"}>
        <Link href="/ultimates/top">
          <p>
            The Omega Protocol (Ultimate) | <code className={"code"}>src/app/ultimates/top/page.tsx</code>
          </p>
        </Link>
      </div>
    </main>
  )
}
