import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import fflogsIntegrationExample from '../../public/examples/fflogs-integration.png';
import ffxivMitigationOverlay from '../../public/examples/ffxiv-mitigation-overlay.gif';
import ffxivDebugger from '../../public/examples/ffxiv-debugger.png';
import partyParses from '../../public/examples/party-parses.png';
import reactMusicInfo from '../../public/examples/react-music-info.png';
import dadJokes from '../../public/examples/dad-jokes.png';

export default function Home() {

  interface workExample {
    name: string;
    languages: string[];
    descriptions: string[];
    githubLink?: string;
    image: StaticImageData;
    imageAlt: string;
    imagePath: string;
    nerdyInfo: string;
    links: Array<{title: string; url: string}>;
  };

  const websiteExamples: workExample[] = [
    {
      name: 'React Music Info',
      languages: [
        'React',
        'Typescript',
        'Node.js',
        'Javascript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'A React website built on top of the Spotify API.',
        'Search and explore artists, their albums, related artists, and songs.',
        'Uses Chart.js for some of the fun graphs.',
        'Deployed on Netlify with a serverless backend for the API requests.',
        'Custom media player styling.'
      ],
      image: reactMusicInfo,
      imageAlt: 'React Music Info example',
      imagePath: '/examples/react-music-info.png',
      nerdyInfo: `A project I used to learn React initially. Mostly just built on top of Spotify's API. Reskinning
        the music player was a fun little thing to learn, you basically make a fake one that sends the commands
        to the real one. There is a small serverless function that handles the API calls, also hosted on Netlify. I
        originally had this on an AWS ec2 instance, but managing it this way was much simpler, and converting
        the server side portion over was very easy and quick.`,
      links: [{
        title: 'React Music Info',
        url: 'https://react-music.info/'
      }]
    },
    {
      name: 'FFLogs Integration',
      languages: [
        'Next.js',
        'React',
        'Chart.js',
        'Typescript',
        'Javascript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'An integration with the FFLogs API: https://www.fflogs.com/',
        'Pulls in Character data (given a World and Character Name) and displays information related to the charcter.'
      ],
      image: fflogsIntegrationExample,
      imageAlt: 'FFLogs Integration example',
      imagePath: '/examples/fflogs-integration.png',
      nerdyInfo: `Mostly server side with JS only being required for the charts and a few portions of the navigation
      requiring user input. Had some fun with Chart.js. Filtering down by Job actually helped me see some personal trends,
      kind of fun to see it being useful immediately. Deployed on Vercel, domain is from PorkBun.`,
      links: [{
        title: 'FFLogs (Tonk Tonkers)',
        url: '/fflogs/Coeurl/Tonk Tonkers/rdps/55/1070'
      }, {
        title: 'FFLogs (manual lookup)',
        url: '/fflogs'
      }],
      githubLink: 'https://github.com/JohnTheFawn/tonk-tonkers'
    },
    {
      name: 'Dad Jokes',
      languages: [
        'Ember.js',
        'Javascript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'A joke website I made with Ember.js for a Friday 1 hour hackathon.'
      ],
      image: dadJokes,
      imageAlt: 'Dad Jokes example',
      imagePath: '/examples/dad-jokes.png',
      nerdyInfo: `Wayfair used to have an employee run 1 hour javascript challenge every Friday. One week it
        was to build a simple website that would deliver jokes from the dad joke api (https://icanhazdadjoke.com/api).
        I had been spending a lot of time in Ember.js at my previous job and had scripts set up to do 1 line
        deploys to s3 buckets, so I just slapped in an image from Unsplash, did some minor css, and set it out.`,
        links: [{
          title: 'Dad Jokes',
          url: 'http://dad-joke.s3-website-us-east-1.amazonaws.com/'
        }]
    }
  ];

  const pluginExamples: workExample[] = [
    {
      name: 'Mitigation Overlay',
      languages: [
        'JavaScript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'Adds resizable bars (shown on the left side of the example below) to the UI for each mitigation on your character.',
        'Timers include tenths place so there is no guessing when they fall off.'
      ],
      githubLink: 'https://github.com/JohnTheFawn/ffxiv-mitigation-overlay/',
      image: ffxivMitigationOverlay,
      imageAlt: 'FFXIV Mitigation Overlay example',
      imagePath: '/examples/ffxiv-mitigation-overlay.gif',
      links: [],
      nerdyInfo: `Listens to the ACT websocket for combat logs, filters down to status effects gained
        message types, uses a white list to filter which mitigations are applied to you. Loading bars
        are SVGs so resizing can work properly, javascript handles their resizing based on status
        expiration. Most of the work on this one was trying to get the visuals to line up in a way that
        was both correct and "felt" correct. In the screenshot below you'll notice the default icons below
        the pink bar actually tick down until the timer disappears and then they randomly go away. This is
        because the tenths place isn't shown and they are on a 1(ish) second update rate. This plugin
        addresses those issues. Check the Github link for more screenshots and examples.`
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
      links: [],
      nerdyInfo: `Listens to the ACT websocket for each log line, decodes it based on the log type, converts 
        it to a friendly object, provides dev buttons/tools to inspect or copy or filter messages. I mostly
        used this project as a way to explore the messages being sent to get a better grasp of what types
        of information was available to me.`
    },
    {
      name: 'Party Parses',
      languages: [
        'JavaScript',
        'HTML',
        'CSS'
      ],
      descriptions: [
        'In game FFLogs integration that looks up your current party.',
        'Clicking the icon expands/collapses everything.',
        'Bounces off a Node.js server running locally to fetch data from FFLogs.'
      ],
      image: partyParses,
      imageAlt: 'Party Parses example',
      imagePath: '/examples/party-parses.png',
      links: [],
      nerdyInfo: `Listens to the ACT websocket for each "Party Changed" event, decodes it, looks up the user
      on FFLogs, and displays the information on a convenient overlay. Updates itself whenever someone joins
      or leaves.`
    }
  ];

  return (
    <main className={`cardWrapper`}>
      
      <Link className={`cardLink`} href="/">
        <u>
          Tonk Tonkers | <code className={"code"}>src/app/page.tsx</code>
        </u>
      </Link>

      {websiteExamples.map(websiteExample => 
        <div className={`card marginTop`} key={websiteExample.name}>
          <h2>{websiteExample.name}</h2>
          <code>{websiteExample.languages.join(', ')}</code>
          {websiteExample.links.map(link => 
            <Link href={link.url} target="_blank" className={`cardLink marginBottom marginTop`} key={link.title}>
              <u>
                  {link.title} | <code className={`code`}>{link.url}</code>
              </u>
            </Link>
          )}
          {websiteExample.githubLink ? 
            <Link href={websiteExample.githubLink} target="_blank">
              <u>
                {websiteExample.githubLink}
              </u>
            </Link>
          : null}
          <div className={`paddingTop paddingBottom`}>
            {websiteExample.descriptions.map(description => 
              <p key={description}>
                - {description}
              </p>
            )}
          </div>
          <p title="Nerdy info I could go on for days and days about" className={`paddingBottom`}>
            🤓 {websiteExample.nerdyInfo}
          </p>
          <div className={`textAlignCenter paddingBottom`}>
            <Link href={websiteExample.imagePath} target="_blank">
              <Image className={`marginTop`} src={websiteExample.image} height={350} alt={websiteExample.imageAlt}/>
            </Link>
          </div>
        </div>
      )}

      <div className={`card marginTop`}>
        <h2>Plugins</h2>
        <div className={`marginBottom`}>
          <p>
            A showcase of the plugins I have programmed for Final Fantasy 14.
          </p>
        </div>
        <ul className={`paddingBottom`}>
          {pluginExamples.map(pluginExample => 
            <li key={pluginExample.name} className={`borderTop paddingTop`}>
              <h2>{pluginExample.name}</h2>
              <code>{pluginExample.languages.join(', ')}</code>
              <div className={`paddingTop`}>
                {pluginExample.githubLink ? 
                  <Link href={pluginExample.githubLink} target="_blank">
                    <u>
                      {pluginExample.githubLink}
                    </u>
                  </Link>
                : null}
              </div>
              <div className={`paddingTop paddingBottom`}>
                {pluginExample.descriptions.map(description => 
                  <p key={description}>
                    - {description}
                  </p>
                )}
              </div>
              <p title="Nerdy info I could go on for days and days about" className={`paddingBottom`}>
                🤓 {pluginExample.nerdyInfo}
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

      <div className={`card marginTop`}>
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
