import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <Link className={styles.description} href="/ultimates/top">
                <h3>Back to Overview</h3>
            </Link>
            <div className={styles.description}>
                <h3>PLD - 1</h3>
                <Link className={styles.description} href="https://www.twitch.tv/videos/1951494527" target="_blank">
                    Vod https://www.twitch.tv/videos/1951494527
                </Link>
                <Link className={styles.description} href="https://www.fflogs.com/reports/mNXBKvYr17FLtkhy#fight=10&type=damage-done" target="_blank">
                    Log https://www.fflogs.com/reports/mNXBKvYr17FLtkhy#fight=10&type=damage-done
                </Link>
                <br/>
                <p>Note: Tank 1 and Tank 2 mitigations are swapped from P3 through P5. No particular reason, just happened naturally as we progged.</p>
            </div>
            <div className={styles.description}>
                <h3>PLD - 2</h3>
                <Link className={styles.description} href="https://www.twitch.tv/videos/1951494527" target="_blank">
                    Vod https://www.twitch.tv/videos/1951494527
                </Link>
                <Link className={styles.description} href="https://www.fflogs.com/reports/xyTgBftHL1rJNkCq#fight=last" target="_blank">
                    Log https://www.fflogs.com/reports/xyTgBftHL1rJNkCq#fight=last
                </Link>
                <br/>
                <p>Note: Tank 1 and Tank 2 mitigations are swapped from P3 through P5. No particular reason, just happened naturally as we progged.</p>
            </div>
        </main>
    )
}