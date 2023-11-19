import Link from 'next/link'

export default function Home() {
  return (
    <main className={"cardWrapper"}>
      <Link className={"cardLink"} href="/">
        <p>
          Tonk Tonkers | <code className={"code"}>src/app/page.tsx</code>
        </p>
      </Link>
      <Link className={"cardLink"} href="/fflogs/Coeurl/Tonk Tonkers">
        <p>
          FF Logs | <code className={"code"}>src/app/fflogs/[world]/[characterName]/page.tsx</code> 
        </p>
      </Link>
      <Link className={"cardLink"} href="/ultimates">
        <p>
          Ultimate Guides | <code className={"code"}>src/app/ultimates/page.tsx</code> 
        </p>
      </Link>
    </main>
  )
}
