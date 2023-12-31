import styles from './page.module.css';
import Link from 'next/link';
import RankingChart from './rankingChart';
import JobPieChart from './jobPieChart';
import RankingPieChart from './rankingPieChart'
import ZoneRankingTable from './zoneRankingTable';
import RankingTable from './rankingTable';
import {
  friendlyPercentage,
  getRankingColor,
  metricToFriendly
} from './utilityFunctions';
import {
  FFLogsZoneRanking,
  FFLogsEncounterRanking
} from './fflogsInterfaces';

let accessToken: string = '';
let accessTokenExpiresAt: Date | null = null;

const fflogsBaseUrl = 'https://www.fflogs.com';
const fflogsAuthUrl = fflogsBaseUrl + '/oauth/token';
const fflogsApiUrl = fflogsBaseUrl + '/api/v2';

const ZONE_ID_ASPHODELOS = 44;
const ZONE_ID_ABYSSOS = 49;
const ZONE_ID_THE_OMEGA_PROTOCOL = 53;
const ZONE_ID_ANABASEIOS = 54;
const ZONE_ID_TRIALS_3 = 55;

async function getAccessToken() {
  let auth: {
    access_token: string,
    expires_in: number
  };
  if(accessToken){
    if(accessTokenExpiresAt === null || new Date() > accessTokenExpiresAt){
      console.log('FFLogs - Access token expired, fetching new one.');
      auth = await((await generateAuthentication()).json());
      accessToken = auth.access_token;
      accessTokenExpiresAt = new Date(new Date().getTime() + auth.expires_in)
      return getAccessToken();
    }
    else{
      return accessToken;
    }
  }
  else{
    console.log('FFLogs - No access token detected, creating one.');
    auth = await((await generateAuthentication()).json());
    accessToken = auth.access_token;
    accessTokenExpiresAt = new Date(new Date().getTime() + auth.expires_in)
    return getAccessToken();
  }
}

async function getRankings(
    serverSlug: string,
    characterName: string,
    metric: string,
    zoneId: number,
    encounterId: string
  ){
  return fetch(fflogsApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + await getAccessToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
        characterData {
          character(name: "${characterName}", serverSlug: "${serverSlug}", serverRegion: "NA") {
            id,
            name,
            zoneRankings(metric: ${metric}, zoneID: ${zoneId})`
            + (encounterId ? `
                encounterRankings(
                  encounterID: ${encounterId},`
                  + (metric != 'speed' ? ` metric: ${metric}` : '') + `
                  )`
              : ``
            ) + `
          }
        }
      }`})
  });
}

function generateAuthentication(){
  return fetch(fflogsAuthUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.FF_LOGS_CLIENT_ID + ':' + process.env.FF_LOGS_CLIENT_SECRET),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'grant_type': 'client_credentials'
    })
  });
}

export default async function FFLogsCharacterPage(
  {params}:
  {
    params: {
      world: string; 
      characterName: string;
      metric: string;
      zoneId: number;
      fflogsParams: string[]
    };
  }) {
  const res = await getRankings(
    params.world,
    decodeURIComponent(params.characterName),
    params.metric,
    params.zoneId,
    params.fflogsParams ? params.fflogsParams[0] : ''
  );
  if(res.ok){
    const response = await res.json();
    const character = response.data.characterData.character;
    const characterId = character.id;
    const characterName = character.name;
    let encounterRankings: FFLogsEncounterRanking[] = character.encounterRankings ? character.encounterRankings.ranks : null;
    let zoneRankings: FFLogsZoneRanking[] = character.zoneRankings ? character.zoneRankings.rankings : [];

    let encounterName = '';
    let friendlySelectedJobName: string | null = null;
    if(params.fflogsParams){
      const fflogsParams = {
        encounterId: params.fflogsParams[0],
        jobName: decodeURI((params.fflogsParams[1] || '')).toLowerCase().replace(/ /g, '')
      };

      // Try to find the Encounter Name from one of the FFLogsEncounterRankings
      for(let i = 0; i < zoneRankings.length; i++){
        const tempRanking = zoneRankings[i];
        if(tempRanking.encounter.id == fflogsParams.encounterId){
          encounterName = tempRanking.encounter.name;
          break;
        }
      }

      // Filter encounterRanking and rankings to the requested job
      if(fflogsParams.jobName){
        encounterRankings = encounterRankings.filter(encounterRanking => 
          encounterRanking.spec.toLowerCase() == fflogsParams.jobName
        );
        friendlySelectedJobName = decodeURI(params.fflogsParams[1]).replace(/([A-Z])/g, ' $1').trim();
        //console.log(encounterRankings);
      }
    }

    //console.log(encounterRankings);
    //console.log(character);
    //console.log(zoneRankings);

    const allStars = character.zoneRankings ? character.zoneRankings.allStars : null;
    //console.log(rankings);
    //console.log(allStars);
    let totalKills = 0;
    zoneRankings.forEach((ranking: { totalKills: number; }) => {
      totalKills += ranking.totalKills;
    });

    let optionalUrlPath = '';
    if(params.fflogsParams){
      params.fflogsParams.forEach(fflogsParam => {
        optionalUrlPath += `/${fflogsParam}`;
      });
    }
    const currentPath = `/fflogs/${params.world}/${params.characterName}/${params.metric}/${params.zoneId}`;

    return (
      <div className={`card ${styles.fflogsWrapper}`}>
        <div style={{display: 'flex'}}>
          <div className={`marginBottom`}>
            <Link
              className={`button marginRight ` + (params.zoneId == ZONE_ID_TRIALS_3 ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_TRIALS_3}`}
            >
              Trials
            </Link>
            <Link
              className={`button marginRight ` + (params.zoneId == ZONE_ID_ANABASEIOS ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ANABASEIOS}`}
            >
              Anabaseios
            </Link>
            <Link
              className={`button marginRight ` + (params.zoneId == ZONE_ID_ABYSSOS ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ABYSSOS}`}
            >
              Abyssos
            </Link>
            <Link
              className={`button marginRight ` + (params.zoneId == ZONE_ID_ASPHODELOS ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ASPHODELOS}`}
            >
              Asphodelos
            </Link>
            <Link
              className={`button marginRight ` + (params.zoneId == ZONE_ID_THE_OMEGA_PROTOCOL ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_THE_OMEGA_PROTOCOL}`}
            >
              The Omega Protocol
            </Link>
          </div>
          <div style={{flex: 1}}/>
          <div className={`marginBottom`}>
            <Link
              className={`button buttonRed marginRight ` + (params.metric == 'rdps' ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/rdps/${params.zoneId}${optionalUrlPath}`}
            >
              Damage
            </Link>
            <Link
              className={`button buttonGreen marginRight ` + (params.metric == 'hps' ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/hps/${params.zoneId}${optionalUrlPath}`}
            >
              Healing
            </Link>
            <Link
              className={`button ` + (params.metric == 'playerspeed' ? `buttonHighlighted` : `` )}
              href={`/fflogs/${params.world}/${params.characterName}/playerspeed/${params.zoneId}${optionalUrlPath}`}
            >
              Speed
            </Link>
          </div>
        </div>
        <h1 className={`textAlignCenter`}>
          {character.name}
        </h1>
        <div className={`${styles.performanceWrapper}`}>
          <span className={`card ${styles.performanceBlock}`}>
            <h2>
              Best Avg.
            </h2>
            <h2 className={`${getRankingColor(character.zoneRankings.bestPerformanceAverage)}`}>
              {friendlyPercentage(character.zoneRankings.bestPerformanceAverage)}%
            </h2>
          </span>
          <span className={`card ${styles.performanceBlock}`}>
            <h2>
              Median Avg.
            </h2>
            <h2 className={`${getRankingColor(character.zoneRankings.medianPerformanceAverage)}`}>
              {friendlyPercentage(character.zoneRankings.medianPerformanceAverage)}%
            </h2>
          </span>
          <span className={`card ${styles.performanceBlock}`}>
            <h2>
              Kills Logged
            </h2>
            <h2>
              {totalKills}
            </h2>
          </span>
        </div>
        <ZoneRankingTable
          rankings={zoneRankings}
          currentPath={currentPath}
        />
        {encounterName ? 
          <h2 className={`textAlignCenter marginTop`}>
            {encounterName} ({metricToFriendly(params.metric)})
          </h2>
        : null}
        {friendlySelectedJobName ?
          <h2 className={`textAlignCenter`}>
            {friendlySelectedJobName}
          </h2> 
        : null}
        {encounterRankings ? 
          <div className={`card marginTop`}>
            <RankingChart
              rankings={encounterRankings}
            />
          </div>
        : null}
        {encounterRankings ?
            <div className={`${styles.chartWrapper} marginTop`}>
              <div className={`card`}>
                <h2 className={`textAlignCenter ${styles.titleBorder}`}>Job Breakdown</h2>
                <div>
                  <JobPieChart rankings={encounterRankings} currentPath={`${currentPath}/${params.fflogsParams[0]}`}/>
                </div>
              </div>
              <div className={`card`}>
                <h2 className={`textAlignCenter ${styles.titleBorder}`}>Ranking Breakdown</h2>
                <div>
                  <RankingPieChart rankings={encounterRankings}/>
                </div>
              </div>
            </div>
        : null}
        {encounterRankings ?
          <RankingTable
            rankings={encounterRankings} metric={params.metric}
            currentPath={`${currentPath}/${params.fflogsParams[0]}`}
          />
        : null}
      </div>
    );
  }
  
  console.log('failed');
  console.log(res.body);
  console.log(res.status, res.statusText);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          FFLogs
        </p>
      </div>
    </main>
  );
}
