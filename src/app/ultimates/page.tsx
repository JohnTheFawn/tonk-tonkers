import Link from 'next/link'

export default function UltimatePage() {
  return (
    <main className={"cardWrapper"}>
      <Link className={"cardLink"} href="/ultimates/top">
        <p>
          The Omega Protocol (Ultimate) | <code className={"code"}>src/app/ultimates/top/page.tsx</code>
        </p>
      </Link>
    </main>
  )
}
