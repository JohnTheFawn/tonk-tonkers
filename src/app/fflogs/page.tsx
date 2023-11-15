import styles from './page.module.css'

let accessToken = null;
let accessTokenExpiresAt = null;

const baseUrl = 'https://www.fflogs.com';
const authUrl = baseUrl + '/oauth/token';
const apiUrl = baseUrl + '/api/v2';

async function getAccessToken() {
  if(accessToken){
    if(new Date() > accessTokenExpiresAt){
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

export default async function Home() {
  console.log('getAccessToken', await getAccessToken());

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
