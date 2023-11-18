import Link from 'next/link'

function createToolboxLink(url: string){
    return (
        <Link target="_blank" href={url}>
            {url}
        </Link>
    );
}

function createMechanicDescription(mechanicName: string, descriptions: string[]){
    return (
        <div className={"card"}>
            <h3>
                {mechanicName}
            </h3>
            {descriptions.map((description: string, index) => 
                <div key={index}>{description}</div>
            )}
        </div>
    );
}

function createMitTable(mitigations: any[]){
    return (
        <table>
            <tbody>
                {mitigations.map((mitigation, index) =>
                    <tr key={index}>
                        <td>{mitigation.actor}</td>
                        {mitigation.name ?
                            <td>&nbsp;-&nbsp;{mitigation.name}</td>
                            :
                            <td>&nbsp;</td>
                        }
                        {mitigation.mechanic ?
                            <td>&nbsp;-&nbsp;{mitigation.mechanic}</td>
                            :
                            <td>&nbsp;</td>
                        }
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default function Home() {
    return (
        <main className={"cardWrapper"}>

            <Link className={"cardLink"} target="_blank" href="https://docs.google.com/spreadsheets/d/1ROErvG1BhTuNvXqPGcR6ZyyhJ7uNTZdf2WzKyVj9hh4" >
                <h1>
                    Mit Sheet
                </h1>
            </Link>

            <Link className={"cardLink"} target="_blank" href="https://pastebin.com/2ZVgUnCY" >
                <h1>
                    PF Pastebin
                </h1>
            </Link>

            <Link className={"cardLink"} href="/ultimates/top/clearvods" >
                <h1>
                    Clear Vods
                </h1>
            </Link>

            {/*Phase 1*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 1</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolbox</h2>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=758088204654761&preview=1")}
                    {createMechanicDescription(
                        "Program Loop",
                        ["TMRH flex priority, G1 West CCW, G2 North CW"]
                    )}
                    {createMechanicDescription(
                        "Pantokrator",
                        ["If 1 and 3 are covered rotate groups rotate CW"]
                    )}
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <br/>
                    <p>10s mitigations should catch 2 stacks during Pantokrator</p>
                    <br/>
                    <p>Tanks use Rampart when Omega jumps away</p>
                    <br/>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "1st panto stack"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "1st panto stack"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "3rd panto stack"
                                }
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "1st panto stack"
                                },
                                {},
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "3rd panto stack"
                                },
                                {},
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Any two stacks"
                                },
                                {},
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "1st panto stack"
                                }
                            ]
                        )}
                    </div>
                </div>

            </details>

            {/*Phase 2*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 2</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolbox</h2>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=324285310725761&preview=1#1")}
                    {createMechanicDescription(
                        "Male/Female",
                        ["G1 Male, G2 Female"]
                    )}
                    {createMechanicDescription(
                        "Party Synergy",
                        [
                            "Conga behind M/F (HRMTTMRH)",
                            "BPOG/GPOB (Blue Pink Orange Green)"
                        ]
                    )}
                    {createMechanicDescription(
                        "611",
                        [
                            "Tanks bait Male dive",
                            "If a tank is dead anyone can fill in",
                            "Casters/phys range can take flares out of the stack to reduce dmg for free"]
                    )}
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <p>
                        Cast 15s mitigations when baiters are hit by male to catch 611 and Cosmo Memory
                    </p>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Party Mit",
                                    mechanic: "611"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "611"
                                }
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "611"
                                }
                            ]
                        )}
                    </div>
                </div>

                <Link className={"cardLink"} href="/ultimates/top/p2">
                    <h3>More Info</h3>
                </Link>

            </details>

            {/*Phase 3*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 3</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolbox</h2>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=243183080764761&preview=1")}
                    {createMechanicDescription(
                        "Transition",
                        ["Conga between 3 and 2 (HRMTTMRH), Purple Forward, White back"]
                    )}
                    {createMechanicDescription(
                        "Monitors",
                        ["Conga between 3 and 2 (HRMTTMRH)"]
                    )}
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <p>
                        10s mitigations can be used any time after your 1st gcd to catch Hello World
                    </p>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal",
                                    mechanic: "Hello World"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Party Mit",
                                    mechanic: "1st Patch Set"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal",
                                    mechanic: "4th Patch Set"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "2nd Patch Set"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "4th Patch Set"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "Critical Error"
                                },
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "Hello World"
                                },
                                {},
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "3rd Patch Set"
                                },
                                {},
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Hello World"
                                },
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Critical Error"
                                },
                                {},
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "3rd Patch Set"
                                }
                            ]
                        )}
                    </div>
                </div>

            </details>

            {/*Phase 4*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 4</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolbox</h2>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=595188367474761&preview=1")}
                    {createMechanicDescription(
                        "Wave Cannon",
                        ["G1 W, G2 E, TRHM N->S, South most flexes"]
                    )}
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <p>
                        10s mitigations should catch both a stack and a protean
                    </p>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal",
                                    mechanic: "Wave Cannon 1"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Party Mit",
                                    mechanic: "Wave Cannon 2"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "Stack 2"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "Wave Cannon 3"
                                }
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "Blue Screen"
                                }
                            ]
                        )}
                    </div>
                </div>

            </details>

            {/*Phase 5*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 5</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolboxes</h2>
                    <h3>Delta</h3>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=732288275415761&preview=1")}
                    <br/>
                    <br/>
                    <h3>Sigma</h3>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=107380954136761&preview=1")}
                    <br/>
                    <br/>
                    <h3>Omega</h3>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=078384491946761&preview=1")}
                    <br/>
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <p>
                        15s mit should be used after the second hit of &#34;Solar Ray&#34;
                    </p>
                    <p>
                        10s mit should be used at the start of the &#34;Run Dynamis&#34; cast
                    </p>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal",
                                    mechanic: "Run ****mi*: Delta"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "Run ****mi*: Sigma"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "Run ****mi*: Omega"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal",
                                    mechanic: "Blind Faith"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "Run ****mi*: Sigma"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "Run ****mi*: Omega"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "Blind Faith"
                                }
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "Run ****mi*: Sigma"
                                },
                                {},
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "Run ****mi*: Delta"
                                },
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "Run ****mi*: Omega"
                                },
                                {},
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Run ****mi*: Delta"
                                },
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Run ****mi*: Omega"
                                },
                                {},
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Run ****mi*: Delta"
                                },
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Run ****mi*: Sigma"
                                },
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Run ****mi*: Omega"
                                },
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Blind Faith"
                                }
                            ]
                        )}
                    </div>
                </div>

            </details>

            {/*Phase 6*/}
            <details className={"card"}>
                <summary>
                    <h1>Phase 6</h1>
                </summary>
                
                {/*Toolbox*/}
                <div className={"card"}>  
                    <h2>Toolbox</h2>
                    {createToolboxLink("https://ff14.toolboxgaming.space/?id=829484027197761&preview=1")}
                </div>

                {/*Mit Cheat Sheet*/}
                <div className={"card"}>
                    <h2>Mit Cheat Sheet</h2>
                    <p>
                        Tank LB Priority: WAR &gt; DRK &gt; PLD &gt; GNB
                    </p>
                    <p>
                        10s mitigations should catch both Wave Cannon proteans and the stack
                    </p>
                    <p>
                        10s mitigations should catch both sets of meteors
                    </p>
                    <div className={"card"}>
                        <h3>Tanks</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Tank 1",
                                    name: "Tank LB",
                                    mechanic: "Cosmo Memory"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "Cosmo Dive 1"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "Wave Cannon 2"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Party Mit",
                                    mechanic: "Cosmo Meteor"
                                },
                                {
                                    actor: "Tank 1",
                                    name: "Tank LB",
                                    mechanic: "Magic Number 1"
                                },
                                {},
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "Cosmo Memory"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal + Party Mit",
                                    mechanic: "Wave Cannon 1"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal",
                                    mechanic: "Cosmo Dive 2"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Party Mit",
                                    mechanic: "Cosmo Meteor"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Reprisal (safety)",
                                    mechanic: "Magic Number 1"
                                },
                                {
                                    actor: "Tank 2",
                                    name: "Tank LB",
                                    mechanic: "Magic Number 2"
                                }
                            ]
                        )}
                    </div>
                    <div className={"card"}>
                        <h3>DPS</h3>
                        {createMitTable(
                            [
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "Cosmo Dive 1"
                                },
                                {
                                    actor: "Melee 1",
                                    name: "Feint",
                                    mechanic: "Cosmo Dive 2"
                                },
                                {},
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "Cosmo Memory"
                                },
                                {
                                    actor: "Melee 2",
                                    name: "Feint",
                                    mechanic: "Wave Cannon 2"
                                },
                                {},
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Cosmo Dive 1"
                                },
                                {
                                    actor: "Caster",
                                    name: "Addle",
                                    mechanic: "Cosmo Dive 2"
                                },
                                {},
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Wave Cannon 1"
                                },
                                {
                                    actor: "Phys Range",
                                    name: "Party Mit",
                                    mechanic: "Cosmo Meteor"
                                }
                            ]
                        )}
                    </div>
                </div>

            </details>
            
        </main>
    )
}
