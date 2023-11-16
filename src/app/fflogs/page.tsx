import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import styles from './page.module.css'

let accessToken: string = '';
let accessTokenExpiresAt: Date | null = null;

const baseUrl = 'https://www.fflogs.com';
const authUrl = baseUrl + '/oauth/token';
const apiUrl = baseUrl + '/api/v2';

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

async function getRankings(serverSlug: string, characterName: string){
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
            zoneRankings
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
    allStars: {
      points: number;
      rank: number;
    };
  }[]){
  return (
    <table>
      <thead>
        <tr>
          <th>
            Encounter
          </th>
          <th>
            Best %
          </th>
          <th>
            Median %
          </th>
          <th>
            Kills
          </th>
          <th>
            Fastest
          </th>
          <th>
            Points
          </th>
          <th>
            Rank
          </th>
        </tr>
      </thead>
      <tbody>
        {rankings.map((ranking) => 
          <tr key={ranking.encounter.id}>
            <td>
              {ranking.encounter.name}
            </td>
            <td className={styles.textAlignRight}>
              {friendlyPercentage(ranking.rankPercent)}%
            </td>
            <td className={styles.textAlignRight}>
              {friendlyPercentage(ranking.medianPercent)}%
            </td>
            <td className={styles.textAlignRight}>
              {ranking.totalKills}
            </td>
            <td className={styles.textAlignRight}>
              {convertMillisecondsToFriendly(ranking.fastestKill)}
            </td>
            <td className={styles.textAlignRight}>
              {ranking.allStars.points}
            </td>
            <td className={styles.textAlignRight}>
              {ranking.allStars.rank}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default async function Home() {
  const res = await getRankings('Coeurl', 'Tonk Tonkers');
  if(res.ok){
    const response = await res.json();
    const character = response.data.characterData.character;
    //console.log(character);
    const zoneRankings = character.zoneRankings;
    const rankings = zoneRankings.rankings;
    const allStars = zoneRankings.allStars;
    console.log(rankings);
    //console.log(allStars);

    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
          {character.name}
          </p>
          <p>
          Best Avg.: {friendlyPercentage(zoneRankings.bestPerformanceAverage)}%
          </p>
          <p>
          Median Avg.: {friendlyPercentage(zoneRankings.medianPerformanceAverage)}%
          </p>
          {createRankingBlock(rankings)}
        </div>
      </main>
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
