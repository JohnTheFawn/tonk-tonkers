import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

let accessToken: string = '';
let accessTokenExpiresAt: Date | null = null;

const baseUrl = 'https://www.fflogs.com';
const authUrl = baseUrl + '/oauth/token';
const apiUrl = baseUrl + '/api/v2';

const JOB_TO_ICON_MAP: Record<string, string> = {
  'blackmage': '/icons/jobs/black-mage.png',
  'darkknight': '/icons/jobs/dark-knight.png',
  'paladin': '/icons/jobs/paladin.png',
  'reaper': '/icons/jobs/reaper.png',
  'whiteMage': '/icons/jobs/white-mage.png'
};

const ZONE_ID_ANABASEIOS = 54;
const ZONE_ID_ABYSSOS = 49;
const ZONE_ID_ASPHODELOS = 44;
const ZONE_ID_THE_OMEGA_PROTOCL = 53;


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

async function getRankings(serverSlug: string, characterName: string, metric: string, zoneId: number){
  return fetch(apiUrl, {
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
            zoneRankings(metric: ${metric}, zoneID: ${zoneId})
          }
        }
      }`})
  });
}

function generateAuthentication(){
  return fetch(authUrl, {
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

function friendlyPercentage(raw: number){
  return raw.toFixed(1);
}

function convertMillisecondsToFriendly(milliseconds: number){
  let response = '';
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

function createRankingBlock(
  rankings: {
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
  }[]){
  return (
    <table className={`${styles.table}`}>
      <thead>
        <tr>
          <th>
            <h3>Encounter</h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Best
            </h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Median
            </h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Kills
            </h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Fastest
            </h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Points
            </h3>
          </th>
          <th style={{width: 90}}>
            <h3>
              Rank
            </h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {rankings.map((ranking) => 
          <tr key={ranking.encounter.id}>
            <td>
              {ranking.encounter.name}
            </td>
            <td className={`textAlignRight ${getRankingColor(ranking.rankPercent)}`}>
              {friendlyPercentage(ranking.rankPercent)}%
            </td>
            <td className={`textAlignRight ${getRankingColor(ranking.medianPercent)}`}>
              {friendlyPercentage(ranking.medianPercent)}%
            </td>
            <td className={`textAlignRight`}>
              {ranking.totalKills}
            </td>
            <td className={`textAlignRight`}>
              {convertMillisecondsToFriendly(ranking.fastestKill)}
            </td>
            <td className={`textAlignRight`}>
              {ranking.allStars.points}
            </td>
            <td className={`textAlignRight ${getRankingColor(ranking.rankPercent)}`}  title={`Rank ${ranking.allStars.rank} out of ${ranking.allStars.total}`}>
              {ranking.allStars.rank}
              {createJobIcon(ranking.bestSpec)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function getJobIcon(jobName: string){
  const parsedJobName = jobName.toLowerCase();
  return JOB_TO_ICON_MAP[parsedJobName];
}

function getRankingColor(ranking: number){
  if(ranking < 25){
    return styles.grey;
  }
  if(ranking < 50){
    return styles.green;
  }
  if(ranking < 75){
    return styles.blue;
  }
  if(ranking < 95){
    return styles.purple;
  }
  if(ranking < 99){
    return styles.orange;
  }
  if(ranking < 100){
    return styles.pink;
  }
  return styles.gold;
}

function createJobIcon(jobName: string){
  return (
    <Image
      src={getJobIcon(jobName)}
      className={`verticalAlignMiddle`}
      alt={`${jobName} icon`}
      width={20} height={20}
    />
  );
}

export default async function FFLogsCharacterPage(
  {params}:
  {
    params: {
      world: string; 
      characterName: string;
      metric: string;
      zoneId: number;
    };
  }) {
  const res = await getRankings(params.world, decodeURIComponent(params.characterName), params.metric, params.zoneId);
  if(res.ok){
    const response = await res.json();
    const character = response.data.characterData.character;
    const characterId = character.id;
    const characterName = character.name;
    //console.log(character);
    const zoneRankings = character.zoneRankings;
    //console.log(zoneRankings);
    const rankings = zoneRankings.rankings;
    const allStars = zoneRankings.allStars;
    //console.log(rankings);
    //console.log(allStars);
    let totalKills = 0;
    rankings.forEach((ranking: { totalKills: number; }) => {
      totalKills += ranking.totalKills;
    });


    return (
      <div className={`card`}>
        <div style={{display: 'flex'}}>
          <div className={`marginBottom`}>
            <Link className={`button marginRight`} href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ANABASEIOS}`}>
              Anabaseios
            </Link>
            <Link className={`button marginRight`} href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ABYSSOS}`}>
              Abyssos
            </Link>
            <Link className={`button marginRight`} href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_ASPHODELOS}`}>
              Asphodelos
            </Link>
            <Link className={`button`} href={`/fflogs/${params.world}/${params.characterName}/${params.metric}/${ZONE_ID_THE_OMEGA_PROTOCL}`}>
              The Omega Protocol
            </Link>
          </div>
          <div style={{flex: 1}}/>
          <div className={`marginBottom`}>
            <Link className={`button buttonRed marginRight`} href={`/fflogs/${params.world}/${params.characterName}/rdps/${params.zoneId}`}>
              Damage
            </Link>
            <Link className={`button buttonGreen marginRight`} href={`/fflogs/${params.world}/${params.characterName}/hps/${params.zoneId}`}>
              Healing
            </Link>
            <Link className={`button`} href={`/fflogs/${params.world}/${params.characterName}/playerspeed/${params.zoneId}`}>
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
        {createRankingBlock(rankings)}
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
