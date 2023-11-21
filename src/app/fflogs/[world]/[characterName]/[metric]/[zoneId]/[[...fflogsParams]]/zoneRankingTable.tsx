import { Key } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import {
    friendlyPercentage,
    getRankingColor,
    convertMillisecondsToFriendly
} from './utilityFunctions';
import JobIcon from './jobIcon';
import { FFLogsZoneRanking } from './fflogsInterfaces';

export default function ZoneRankingTable(
        {
            rankings,
            currentPath
        }: {
            rankings: FFLogsZoneRanking[];
            currentPath: string;
        }
    ){
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
                        <Link
                        href={`${currentPath}/${ranking.encounter.id}`}
                        >
                        <div>
                            <u>
                            {ranking.encounter.name}
                            </u>
                        </div>
                        </Link>
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
                        {ranking.allStars ? ranking.allStars.points : null}
                    </td>
                    <td
                        className={`textAlignRight ${getRankingColor(ranking.rankPercent)}`}
                        title={ranking.allStars ? `Rank ${ranking.allStars.rank} out of ${ranking.allStars.total}` : ``}>
                        {ranking.allStars ? ranking.allStars.rank : null}
                        {ranking.allStars ? <JobIcon jobName={ranking.bestSpec}/> : null}
                    </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}