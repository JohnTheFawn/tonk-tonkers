import styles from './page.module.css'

export function convertMillisecondsToFriendly(milliseconds: number){
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

export function getRankingColor(ranking: number){
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

export function friendlyPercentage(raw: number){
    return Math.floor(raw);
}

export function metricToFriendly(metric: string){
  if(metric == 'rdps'){
    return 'Damage';
  }
  if(metric == 'hps'){
    return 'Healing';
  }
  if(metric == 'playerspeed'){
    return 'Speed';
  }
  return '';
}