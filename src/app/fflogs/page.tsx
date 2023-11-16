import styles from './page.module.css'

let accessToken = '';
let accessTokenExpiresAt: Date | null = null;

const baseUrl = 'https://www.fflogs.com';
const authUrl = baseUrl + '/oauth/token';
const apiUrl = baseUrl + '/api/v2';

async function getAccessToken() {
  if(accessToken){
    if(accessTokenExpiresAt === null || new Date() > accessTokenExpiresAt){
      console.log('FFLogs - Access token expired, fetching new one.');
      const auth = await generateAccessToken();
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
    const res = await generateAccessToken();
    const auth = await res.json();
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

function generateAccessToken(){
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

export default async function Home() {
  const res = await getRankings('Coeurl', 'Tonk Tonkers');
  if(!res.ok){
    console.log('failed');
    console.log(res.body);
    console.log(res.status, res.statusText);
  }
  else{
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
          Best Performance Average: {friendlyPercentage(zoneRankings.bestPerformanceAverage)}%
          </p>
          <p>
          Median Performance Average: {friendlyPercentage(zoneRankings.medianPerformanceAverage)}%
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          FFLogs
        </p>
      </div>
    </main>
  )
}
