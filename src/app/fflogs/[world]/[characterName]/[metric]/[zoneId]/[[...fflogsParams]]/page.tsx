import { Key } from 'react';
import styles from './page.module.css'
import Link from 'next/link'
import RankingChart from './rankingChart'
import JobPieChart from './jobPieChart'
import RankingPieChart from './rankingPieChart'
import AllStarRankTable from './allStarRankTable';
import RankingTable from './rankingTable';
import {
  friendlyPercentage,
  getRankingColor,
  metricToFriendly
} from './utilityFunctions';

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

function createPieCharts(
  ranks: {
    historicalPercent: number;
    bestSpec: string;
  }[]
  ){
  if(!ranks){
    return (null);
  }
  return (
    <div className={`${styles.chartWrapper} marginTop`}>
      <div className={`card`}>
        <h2 className={`textAlignCenter ${styles.titleBorder}`}>Job Breakdown</h2>
        <div>
          <JobPieChart rankings={ranks}/>
        </div>
      </div>
      <div className={`card`}>
        <h2 className={`textAlignCenter ${styles.titleBorder}`}>Ranking Breakdown</h2>
        <div>
          <RankingPieChart rankings={ranks}/>
        </div>
      </div>
    </div>
  )
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
    const zoneRankings = character.zoneRankings;
    const encounterRankings = character.encounterRankings;

    let encounterName = '';
    if(params.fflogsParams){
      for(let i = 0; i < zoneRankings.rankings.length; i++){
        const tempRanking = zoneRankings.rankings[i];
        if(tempRanking.encounter.id == params.fflogsParams[0]){
          encounterName = tempRanking.encounter.name;
          break;
        }
      }
    }

    //console.log(encounterRankings);
    //console.log(character);
    //console.log(zoneRankings);
    const rankings: {
      encounter: {
          id: Key;
          name: string;
      };
      rankPercent: number;
      medianPercent: number;
      totalKills: number;
      fastestKill: number;
      bestSpec: string;
      allStars: {
          points: number;
          rank: number;
          total: number;
      };
    }[] = zoneRankings.rankings;

    const allStars = zoneRankings.allStars;
    //console.log(rankings);
    //console.log(allStars);
    let totalKills = 0;
    rankings.forEach((ranking: { totalKills: number; }) => {
      totalKills += ranking.totalKills;
    });

    let optionalUrlPath = '';
    if(params.fflogsParams){
      params.fflogsParams.forEach(fflogsParam => {
        optionalUrlPath += `/${fflogsParam}`;
      });
    }

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
            <h2 className={`${getRankingColor(zoneRankings.bestPerformanceAverage)}`}>
              {friendlyPercentage(zoneRankings.bestPerformanceAverage)}%
            </h2>
          </span>
          <span className={`card ${styles.performanceBlock}`}>
            <h2>
              Median Avg.
            </h2>
            <h2 className={`${getRankingColor(zoneRankings.medianPerformanceAverage)}`}>
              {friendlyPercentage(zoneRankings.medianPerformanceAverage)}%
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
        <AllStarRankTable
          rankings={rankings}
          currentPath={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${params.zoneId}`}
        />
        {encounterRankings ?
            <h2 className={`textAlignCenter marginTop`}>
              {encounterName} ({metricToFriendly(params.metric)})
            </h2>
        : null}
        {encounterRankings ? 
          <div className={`card marginTop`}>
            <RankingChart rankings={encounterRankings.ranks}/>
          </div>
        : null}
        {encounterRankings ?
          createPieCharts(encounterRankings.ranks)
        : null}
        {encounterRankings ?
          <RankingTable rankings={encounterRankings.ranks} metric={params.metric} />
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
