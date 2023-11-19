import Link from 'next/link'

export default function ClearVodsPage() {
    return (
        <main className={"cardWrapper"}>
            <Link className={"card"} href="/ultimates/top">
                <h1>Back to Overview</h1>
            </Link>
            <div className={"card"}>
                <h3>PLD - 1</h3>
                <Link className={"cardLink"} href="https://www.twitch.tv/videos/1951494527" target="_blank">
                    Vod https://www.twitch.tv/videos/1951494527
                </Link>
                <Link className={"cardLink"} href="https://www.fflogs.com/reports/mNXBKvYr17FLtkhy#fight=10&type=damage-done" target="_blank">
                    Log https://www.fflogs.com/reports/mNXBKvYr17FLtkhy#fight=10&type=damage-done
                </Link>
                <br/>
                <p>Note: Tank 1 and Tank 2 mitigations are swapped from P3 through P5. No particular reason, just happened naturally as we progged.</p>
            </div>
            <div className={"card"}>
                <h3>PLD - 2</h3>
                <Link className={"cardLink"} href="https://www.twitch.tv/videos/1922683785" target="_blank">
                    Vod https://www.twitch.tv/videos/1922683785
                </Link>
                <Link className={"cardLink"} href="https://www.fflogs.com/reports/xyTgBftHL1rJNkCq#fight=last" target="_blank">
                    Log https://www.fflogs.com/reports/xyTgBftHL1rJNkCq#fight=last
                </Link>
                <br/>
                <p>Note: Double shield healer (Sage/Scholar).</p>
            </div>
        </main>
    )
}