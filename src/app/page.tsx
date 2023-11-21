import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import fflogsIntegrationExample from '../../public/examples/fflogs-integration.png';
import ffxivMitigationOverlay from '../../public/examples/ffxiv-mitigation-overlay.gif';
import ffxivDebugger from '../../public/examples/ffxiv-debugger.png';

export default function Home() {

  const pluginExamples: {
    name: string;
    languages: string[];
    descriptions: string[];
    githubLink: string;
    image: StaticImageData;
    imageAlt: string;
    imagePath: string;
    nerdyInfo: string;
  }[] = [
    {
      name: 'Mitigation Overlay',
      languages: [
        'JavaScript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'Adds resizable bars to the UI for each mitigation on your character.',
        'Timers include tenths place so there is no guessing when they fall off.'
      ],
      githubLink: 'https://github.com/JohnTheFawn/ffxiv-mitigation-overlay/',
      image: ffxivMitigationOverlay,
      imageAlt: 'FFXIV Mitigation Overlay example',
      imagePath: '/examples/ffxiv-mitigation-overlay.gif',
      nerdyInfo: `Listens to the ACT websocket for combat logs, filters down to status effects gained
        message types, uses a white list to filter which mitigations are applied to you. Loading bars
        are SVGs so resizing can work properly, javascript handles their resizing based on status
        expiration. Most of the work on this one was trying to get the visuals to line up in a way that
        was both correct and "felt" correct. In the screenshot below you'll notice the default icons below
        the pink bar actually tick down until the timer disappears and then they randomly go away. This is
        because the tenths place isn't shown and they are on a 1(ish) second update rate. This plugin
        addresses those issues.`
    },
    {
      name: 'FFXIV Debugger',
      languages: [
        'JavaScript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'Live decoded stream of the network events in the browser.',
        'Useful when tracking down IDs or debugging events.'
      ],
      githubLink: 'https://github.com/JohnTheFawn/ffxiv-debugger/',
      image: ffxivDebugger,
      imageAlt: 'FFXIV Debugger example',
      imagePath: '/examples/ffxiv-debugger.png',
      nerdyInfo: `Listens to the ACT websocket for each log line sent to the server, decodes it based on the log type,
        converts it to a friendly object, provides dev buttons/tools to inspect or copy or filter messages.
        I mostly used this project as a way to explore the messages being sent to get a better grasp of what
        types of information was available to me.`
    }
  ];

  return (
    <main className={`cardWrapper`}>
      
      <Link className={`cardLink`} href="/">
        <u>
          Tonk Tonkers | <code className={"code"}>src/app/page.tsx</code>
        </u>
      </Link>

      <div className={`card`}>
        <h2>FFLogs Integration</h2>
        <code>Next.js, TypeScript, JavaScript, HTML, CSS, Chart.js</code>
        <div className={`paddingTop`}>
          <Link className={`cardLink marginBottom`} href="/fflogs/Coeurl/Tonk Tonkers/rdps/55/1070">
              <u>
                FF Logs | <code className={`code`}>src/app/fflogs/[world]/[characterName]/[metric]/[zoneId]/[[...fflogsParams]]page.tsx</code>
              </u>
          </Link>
        </div>
        <div className={`paddingTop`}>
          <Link href="https://github.com/JohnTheFawn/tonk-tonkers" target="_blank">
            <u>
              https://github.com/JohnTheFawn/tonk-tonkers
            </u>
          </Link>
        </div>
        <p className={`paddingTop paddingBottom`}>
          - An integration with the <Link href="https://www.fflogs.com/"><u>FFLogs</u></Link> api.
        </p>
        <p title="Nerdy info I could go on for days and days about" className={`paddingBottom`}>
          🤓: Mostly server side with JS only being required for the charts and a few portions of the navigation
          requiring user input. Had some fun with Chart.js. Filtering down by Job actually helped me see some personal
          trends, kind of fun to see it being useful immediately. Deployed on <Link href="https://vercel.com" target="_blank"><u>Vercel</u></Link>
          , domain is from <Link href="https://porkbun.com/" target="_blank"><u>PorkBun</u></Link>.
        </p>
        <div className={`textAlignCenter paddingBottom`}>
          <Link href="/examples/fflogs-integration.png" target="_blank">
            <Image className={`marginTop`} src={fflogsIntegrationExample} height={350} alt="FFLogs Integration example"/>
          </Link>
        </div>
      </div>

      <div className={`card`}>
        <h2>Plugins</h2>
        <div className={`borderBottom paddingBottom marginBottom`}>
          <p>
            A showcase of the plugins I have programmed for Final Fantasy 14.
          </p>
        </div>
        <ul className={`paddingBottom`}>
          {pluginExamples.map(pluginExample => 
            <li key={pluginExample.name}>
              <h2>{pluginExample.name}</h2>
              <code>{pluginExample.languages.join(', ')}</code>
              <div className={`paddingTop`}>
                <Link href={pluginExample.githubLink} target="_blank">
                  <u>
                    {pluginExample.githubLink}
                  </u>
                </Link>
              </div>
              <div className={`paddingTop paddingBottom`}>
                {pluginExample.descriptions.map(description => 
                  <p key={description}>
                    - {description}
                  </p>
                )}
              </div>
              <p title="Nerdy info I could go on for days and days about" className={`paddingBottom`}>
                🤓: {pluginExample.nerdyInfo}
              </p>
              <div className={`textAlignCenter paddingBottom`}>
                <Link href={pluginExample.imagePath} target="_blank">
                  <Image className={`marginTop`} src={pluginExample.image} height={350} alt={pluginExample.imageAlt}/>
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className={`card`}>
        <h2>Ultimate Guides</h2>
        <Link className={`cardLink marginBottom`} href="/ultimates">
          <u>
            Ultimate Guides | <code className={`code`}>src/app/ultimates/page.tsx</code> 
          </u>
        </Link>
        <p>
          Nerdy guides I made for Final Fantasy 14 to share with my friends 🤓
        </p>
        <p>
          For some context, these encounters are 17-20 minutes long, usually require a deathless or near-perfect run, are explicitly meant to be the 0.1% hard content. Folks typically spend 1-6 months learning the encounter before being able to complete it, the majority of the playerbase doesn&#39;t even step foot in them, with even fewer completing it.
        </p>
      </div>

    </main>
  )
}
