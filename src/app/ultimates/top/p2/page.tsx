import Link from 'next/link'
import Image from 'next/image'
import midGlitch from '../../../../../public/ultimates/top/mid-glitch.png'
import remoteGlitch from '../../../../../public/ultimates/top/remote-glitch.png'
import p2Conga from '../../../../../public/ultimates/top/p2-conga.png'
import p2bpogbpog from '../../../../../public/ultimates/top/p2-bpog-bpog.png'
import p2bpoggpob from '../../../../../public/ultimates/top/p2-bpog-gpob.png'
import p2MidGlitchStack from '../../../../../public/ultimates/top/p2-mid-glitch-stack.png'
import p2RemoteGlitchStack from '../../../../../public/ultimates/top/p2-remote-glitch-stack.png'

export default function P2Page() {
    return (
        <main className={"cardWrapper"}>
            <Link className={"cardLink"} href="/ultimates/top">
                <h1>Back to Overview</h1>
            </Link>
            <div className={"card"}>
                <h3>Male/Female</h3>
                <p>- Group 1 will take Male (West), Group 2 will take Female (East).</p>
                <p>- The 4 people closest to each will get a debuff (Packet Filter F or Packet Filter M) preventing them from damaging the other, make sure you don&#39;t stand too close to the wrong one as they overlap in the middle</p>
                <p>- You will be able to get 2-3 gcds of cleave in at the start before the Packet Filter debuff goes out</p>
                <p>- Male&#39;s auto attacks are physical damage.</p>
                <p>- Female&#39;s auto attacks are magic damage.</p>

                <hr/>
                <h3>Solar Ray Tankbusters (165,000 - 190,000) and Auto Attack x3 (108,000)</h3>
                <p>- Rampart needs to be used when Omega jumps away in Phase 1.</p>
                <p>- Tanks use all your mits except your 30% (Sentinel/Vengeance/Shadow Wall/Nebula).</p>
                <p>- The following 3 autos do about 38,000 each (108,000 total, 3s between autos) so try to have some mit/healing to handle this as well (second sheltron, equilibrium, second oblation, and aurora). You will still most likely need help from healers.</p>
                <p>- Tank 1 can use Reprisal on this. It will only work on their target due to the Packet Filter debuff.</p>

                <hr/>
                <h3>Party Synergy</h3>
                <p>- Tanks can taunt each other&#39;s target during this cast so they don&#39;t need to worry about clipping later. It may cause you to lose an auto attack (only really important for Paladins depending on how many hard casts they did).</p>
                <br/>
                <p>- Conga behind Male/Female<br/>Healer 1 - Ranged 1 - Melee 1 - Tank 1 - Tank 2 - Melee 2 - Ranged 2 - Healer 2</p>
                <p>- If someone on your left has the same shape as you, you are going to the right of the eye to resolve your tether.</p>
                <p>- If someone on your right has the same shape as you, you are going to the left of the eye to resolve your tether.</p>
                <p>- Check your debuff, it will either be Mid Glitch or Remote Glitch.</p>
                <div className={"card textAlignCenter"}>
                    Mid Glitch: <Image src={midGlitch} className={"verticalAlignMiddle"} alt="Mid Glitch debuff" width={24} height={32}/>
                    <br/>
                    Remote Glitch: <Image src={remoteGlitch} className={"verticalAlignMiddle"} alt="Remote Glitch debuff" width={24} height={32}/>
                    <br/>
                    <Link href="/ultimates/top/p2-conga.png" target="_blank">
                        <Image src={p2Conga} width={250} height={250} alt="P2 Conga"/>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/ultimates/top/p2-conga-ingame.png" target="_blank">
                        <h3>
                            <u>
                                Ingame Conga
                            </u>
                        </h3>
                    </Link>
                </div>
                
                <br/>
                <p>- Do a quick look for the eye, if you don&#39;t find it before the clones spawn that is fine, focus on the clones.</p>
                <p>- Resolve the clones. Dont get baited by the fake ones, there will be a male with a sword standing in the middle and a female with a staff standing along the outside (the fake female will also be slightly farther out than the others). Male and Female will always be opposite each other. The snapshot on this is incredibly early, I recommend using Sprint here until you get comfortable (it also helps with getting to your spot after). If you see it pop up on the ground it has already snapshot.</p>
                <p>- While waiting for the clones to resolve, find the eye if you haven&#39;t. This is your new North.</p>
                <p>- Mid Glitch: both sides line up in the same BPOG (From North to South: Blue, Pink, Orange, Green) order on each side. Line up with the outside of the relative intercardinal markers (or roughly two tick marks towards the eye laser if looking at the edge of the arena). If you stand too close to your partner, both of you get a vulnerability stack and die.</p>
                <p>- Remote Glitch: the right side will adjust their line up to GPOB (From North to South: Green, Pink, Orange, Blue. Green and Blue Swap). All the way to the wall. Square and Circle should be 3-4 tick marks away from the middle so they don&#39;t overlap. X and Triangle still stand infront of the second tick mark.</p>
                <p>- Spread Damage: 29,000-33,000</p>
                <div className={`card textAlignCenter`}>
                    Mid Glitch (BPOG-BPOG)
                    <br/>
                    <Link href="/ultimates/top/p2-bpog-bpog.png" target="_blank">
                        <Image src={p2bpogbpog} width={250} height={250} alt="P2 Mid Glitch tethers and spread"/>
                    </Link>
                    <br/>
                    <br/>
                    Remote Glitch (BPOG-GPOB)
                    <br/>
                    <Link href="/ultimates/top/p2-bpog-gpob.png" target="_blank">
                        <Image src={p2bpoggpob} width={250} height={250}  alt="P2 Remote Glitch tethers and spread"/>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/ultimates/top/p2-laser-width.png" target="_blank">
                        <h3>
                            <u>
                                Laser Width
                            </u>
                        </h3>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/ultimates/top/p2-two-ticks.png" target="_blank">
                        <h3>
                            <u>
                                Ingame X/Triangle Positioning (2 tick marks)
                            </u>
                        </h3>
                    </Link>
                    <br/>
                    <br/>
                    <Link href="/ultimates/top/p2-three-ticks.png" target="_blank">
                        <h3>
                            <u>
                                Ingame Far Circle/Square Positioning (3 tick marks)
                            </u>
                        </h3>
                    </Link>
                </div>
                <br/>

                <p>- After the eye goes off look at both sides. If there are two stacks on the same side, the North-most (closest to where the eye was) will be flexing to the other side. This means their tether partner needs to flex as well to resolve the tether and stack.</p>
                <p>- Find the side that has 3 males, that is now the new North.</p>
                <p>- Female will be doing a knockback from mid.</p>
                <p>- If you were on the left side of the eye, you are getting knocked to the West.</p>
                <p>- If you were on the right side of the eye, you are either getting knocked South (for Mid Glitch) or East (for Remote Glitch).</p>
                <p>- If you were the North-most stack and have to flex, this is where that happens, make sure you get knocked to the appropriate side.</p>
                <p>- Mid Glitch: Just outside the marker you get knocked to. If you are looking at rings on the ground that would be the inner edge of the 2nd ring. Careful not to get clipped by the males.</p>
                <p>- Remote Glitch: To the wall.</p>
                <p>- Stack Damage: 50,000 - 60,000</p>
                <div className={"card"}>
                    <div className={"textAlignCenter"}>
                        Mid Glitch - Behind the marker
                        <br/>
                        <Link href="/ultimates/top/p2-mid-glitch-stack.png" target="_blank">
                            <Image src={p2MidGlitchStack} width={250} height={250}  alt="P2 Mid Glitch Stack"/>
                        </Link>
                    </div>
                    <br/>
                    <div className={"textAlignCenter"}>
                        Remote Glitch - To the wall
                        <br/>
                        <Link href="/ultimates/top/p2-remote-glitch-stack.png" target="_blank">
                            <Image src={p2RemoteGlitchStack} width={250} height={250}  alt="P2 Remote Glitch Stack"/>
                        </Link>
                    </div>
                </div>
                <br/>

                <p>- Shortly after the stacks resolve Male and Female will be targettable. Note that they have changed genders, make sure you are hitting the correct one, tanks will need to regain enmity by taunting (either before Male/Female go away or before your first gcd, they will double auto a tank if you use it after).</p>
                <p>- Male will be where North was (he is the middle clone). He will auto 3 times for 38,000 each (114,000 total) before locking in place to make a shield and then start casting. He will need to be repositioned mid before this so melee/tanks can hit him. If Tank 1 didn&#39;t use reprisal earlier, this is their last chance to use it before Phase 3.</p>
                <p>- Female will be middle. She will auto 5 times for 38,000 each (190,000 total). Tank 2 will need heals/mit to live. Tank buddy mit can be used early on here and be up for the tankbuster. Tank 2 can use Reprisal to help with their auto attacks.</p>

                <hr/>
                <h3>Limitless Synergy</h3>
            </div>
        </main>
    )
}