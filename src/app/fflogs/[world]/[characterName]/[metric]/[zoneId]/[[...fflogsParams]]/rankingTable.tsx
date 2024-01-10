import Link from 'next/link';
import styles from './page.module.css';
import {
    friendlyPercentage,
    getRankingColor,
    convertMillisecondsToFriendly
} from './utilityFunctions';
import JobIcon from './jobIcon';
import { 
    FFLogsEncounterRanking,
    FFLogsReport
} from './fflogsInterfaces';

function convertStartTimeToFriendly(startTime: number){
  const startTimeDate = new Date(startTime);
  return (startTimeDate.getMonth() + 1) + '/' + startTimeDate.getDate() + '/' + startTimeDate.getFullYear();
}

function createXivAnalysisLink(report: FFLogsReport){
    return `https://xivanalysis.com/fflogs/${report.code}/${report.fightID}`;
}

export default function RankingTable(
        {
            rankings,
            metric,
            currentPath
        }: {
            rankings: FFLogsEncounterRanking[];
            metric: string;
            currentPath: string
        }
    ){
    return (
        <table className={`${styles.table} marginTop`}>
            <thead>
            <tr>
                <th>
                    <h3 className={`textAlignLeft`}>
                        Date
                    </h3>
                </th>
                <th>
                    <h3 title="Historical Rank">
                        Hist. Rank
                    </h3>
                </th>
                <th>
                    <h3 title="Historical Logs">
                        Hist. Logs
                    </h3>
                </th>
                <th>
                    <h3>
                        Todays Rank
                    </h3>
                </th>
                <th>
                    <h3>
                        Todays Logs
                    </h3>
                </th>
                <th>
                    <h3>
                        {(metric === 'hps' ? "Healing" : "Damage")}
                    </h3>
                </th>
                <th>
                    <h3>
                        Duration
                    </h3>
                </th>
                <th>
                    <h3>
                        Links
                    </h3>
                </th>
            </tr>
            </thead>
            <tbody>
                {rankings.map((ranking) => 
                <tr key={ranking.startTime}>
                    <td>
                        {convertStartTimeToFriendly(ranking.startTime)}
                    </td>
                    <td className={`textAlignRight ${getRankingColor(ranking.historicalPercent)}`} title={ranking.bestSpec.replace(/([A-Z])/g, ' $1').trim()}>
                        {friendlyPercentage(ranking.historicalPercent)}%
                        <Link href={`${currentPath}/${ranking.bestSpec}`}><JobIcon jobName={ranking.bestSpec}/></Link>
                    </td>
                    <td className={`textAlignRight`}>
                        {ranking.historicalTotalParses}
                    </td>
                    <td className={`textAlignRight ${getRankingColor(ranking.todayPercent)}`}>
                        {friendlyPercentage(ranking.todayPercent)}%
                    </td>
                    <td className={`textAlignRight`}>
                        {ranking.todayTotalParses}
                    </td>
                    <td className={`textAlignRight`}>
                        {(metric == 'hps' ? ranking.amount.toFixed(2) : null)}
                        {(metric == 'rdps' ? ranking.amount.toFixed(2) : null)}
                    </td>
                    <td className={`textAlignRight`}>
                        {convertMillisecondsToFriendly(ranking.duration)}
                    </td>
                    <td className={`textAlignCenter`}>
                        <Link href={`https://www.fflogs.com/reports/${ranking.report.code}#fight=${ranking.report.fightID}`} target="_blank">
                            <u>
                                FF Logs
                            </u>
                        </Link>
                        &nbsp;
                        |
                        &nbsp;
                        <Link href={createXivAnalysisLink(ranking.report)} target="_blank">
                            <u>
                                Analyze
                            </u>
                        </Link>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    )
}