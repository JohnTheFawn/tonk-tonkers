import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <Link className={styles.description} href="/ultimates/top">
                <h1>Back to Overview</h1>
            </Link>
            <div className={styles.description}>
                <h3>Male/Female</h3>
                <p>- Group 1 will take Male (West), Group 2 will take Female (East).</p>
                <p>- The 4 people closest to each will get a debuff preventing them from damaging the other, make sure you don't stand too close to the wrong one as they overlap in the middle</p>
                <p>- Male's auto attacks are physical damage.</p>
                <p>- Female's auto attacks are magic damage.</p>

                <hr/>
                <h3>Solar Ray Tankbusters</h3>
                <p>- Rampart needs to be used when Omega jumps away in Phase 1.</p>
                <p>- Tanks use all your mits except your 30% (Sentinel/Vengeance/Shadow Wall/Nebula).</p>
                <p>- The following 3 autos do about 38,000 each (108,000 total) so try to have some mit/healing to handle this as well (second sheltron, equilibrium, second oblation, and aurora). You will still need help from healers</p>
                <p>- Tank 1 can use Reprisal on this. It will only work on their target due to the firewall debuff.</p>

                
                <hr/>
                <h3>Party Synergy</h3>
                <p>- Tanks can taunt each other's target during this cast so they don't need to worry about clipping later.</p>
                <br/>
                <p>- Conga behind Male/Female<br/>Healer 1 - Ranged 1 - Melee 1 - Tank 1 - Tank 2 - Melee 2 - Ranged 2 - Healer 2</p>
                <p>- If someone on your left has the same shape as you, you are going to the right of the eye to resolve your tether.</p>
                <p>- If someone on your right has the same shape as you, you are going to the left of the eye to resolve your tether.</p>
                <p>- Check your debuff, it will either be Mid Glitch or Remote Glitch.</p>
                <div className={`${styles.description} ${styles.textAlignCenter}`}>
                    Mid Glitch: <img src="/ultimates/top/mid-glitch.png" className={styles.verticalAlignMiddle}/>
                    <br/>
                    Remote Glitch: <img src="/ultimates/top/remote-glitch.png" className={styles.verticalAlignMiddle}/>
                    <br/>
                    <img src="/ultimates/top/p2-conga.png" width="250px"/>
                </div>
                
                <br/>
                <p>- Do a quick look for the eye, if you don't find it before the clones spawn that is fine, focus on the clones.</p>
                <p>- Resolve the clones. Dont get baited by the fake ones, there will be a male with a sword standing in the middle and a female with a staff standing along the outside (the fake female will also be slightly farther out than the others). Male and Female will always be opposite each other. The snapshot on this is incredibly early, I recommend Sprint here until you get comfortable (it also helps with getting to your spot after). If you see it pop up on the ground it has already snapshot.</p>
                <p>- While waiting for the clones to resolve, find the eye if you haven't. This is your new North.</p>
                <p>- Mid Glitch: both sides line up in the same BPOG (From North to South: Blue, Pink, Orange, Green) order on each side. Line up with the outside of the markers (or two tick marks if looking at the edge of the arena). If you stand too close to your partner, both of you get a vulnerability stack and die.</p>
                <p>- Remote Glitch: the right side will adjust their line up to GPOB (From North to South: Green, Pink, Orange, Blue. Green and Blue Swap). All the way to the wall. Square and Circle should be 3-4 tick marks away from the middle so they don't overlap. X and Triangle still stand infront of the second tick mark.</p>
                <div className={styles.description}>
                    <div className={styles.textAlignCenter}>
                        Mid Glitch (BPOG-BPOG)
                        <br/>
                        <Link href="/ultimates/top/p2-bpog-bpog.png" target="_blank">
                            <img src="/ultimates/top/p2-bpog-bpog.png" width="250px"/>
                        </Link>
                    </div>
                    <br/>
                    <div className={styles.textAlignCenter}>
                        Remote Glitch (BPOG-GPOB)
                        <br/>
                        <Link href="/ultimates/top/p2-bpog-gpob.png" target="_blank">
                            <img src="/ultimates/top/p2-bpog-gpob.png" width="250px"/>
                        </Link>
                    </div>
                </div>
                <br/>

                <p>- After the eye goes off look at both sides. If there are two stacks on the same side, the North-most (closest to where the eye was) will be flexing to the other side. This means their tether partner needs to flex as well to resolve the tether and stack.</p>
                <p>- Find the side that has 3 males, that is now the new North.</p>
                <p>- If you were on the left side of the eye, you are getting knocked to the West.</p>
                <p>- If you were on the right side of the eye, you are either getting knocked South (for Mid Glitch) or East (for Remote Glitch)</p>
                <p>- If you were the North-most stack and had to flex, this is where that happens, make sure you get knocked to the appropriate side.</p>
                <p>- Mid Glitch: Just outside the marker you get knocked to. If you are looking at rings on the ground that would be the inner edge of the 2nd ring. Careful not to get clipped by the males.</p>
                <p>- Remote Glitch: To the wall.</p>
                <div className={styles.description}>
                    <div className={styles.textAlignCenter}>
                        Mid Glitch - Behind the marker
                        <br/>
                        <Link href="/ultimates/top/p2-mid-glitch-stack.png" target="_blank">
                            <img src="/ultimates/top/p2-mid-glitch-stack.png" width="250px"/>
                        </Link>
                    </div>
                    <br/>
                    <div className={styles.textAlignCenter}>
                        Remote Glitch - To the wall
                        <br/>
                        <Link href="/ultimates/top/p2-remote-glitch-stack.png" target="_blank">
                            <img src="/ultimates/top/p2-remote-glitch-stack.png" width="250px"/>
                        </Link>
                    </div>
                </div>
                <br/>

                <p>- After this resolves Male and Female will be targettable. Note that they have changed genders so tanks will need to regain enmity by taunting (either before they go away or before your first gcd, they will double auto a tank if you use it after).</p>
                <p>- Male will be where North was (he is the middle clone). He will auto 2-3 times for 38,000 each before locking in place. He will need to be repositioned mid for the next mechanic so melee/tanks can hit him.</p>
                <p>- Female will be middle. She will auto 5 times for 38,000 each (190,000 total). Tank 2 will need heals/mit to live. Tank buddy mit can be used early on here and be up for the tankbuster. Tank 2 can use Reprisal to help with their auto attacks.</p>

                <hr/>
                <h3>Limitless Synergy</h3>
            </div>
        </main>
    )
}