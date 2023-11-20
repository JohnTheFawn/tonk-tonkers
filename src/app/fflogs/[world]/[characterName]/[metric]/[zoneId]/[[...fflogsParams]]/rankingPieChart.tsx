'use client'
 
import { Chart, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import 'chartjs-adapter-moment'

/**
 * Get an rgba color given a ranking
 * 
 * @param ranking The ranking to get a color for
 * @returns The color corresponding to the given ranking
 */
function getRankingColor(ranking: number){
    if(ranking < 25){
      return 'rgba(102, 102, 102, .7)';
    }
    if(ranking < 50){
      return 'rgba(30, 255, 0, .7)';
    }
    if(ranking < 75){
      return 'rgba(0, 112, 255, .7)';
    }
    if(ranking < 95){
      return 'rgba(163, 53, 238, .7)';
    }
    if(ranking < 99){
      return 'rgba(255, 128, 0, .7)';
    }
    if(ranking < 100){
      return 'rgba(226, 104, 168, .7)';
    }
    return 'rgba(229, 204, 128, .7)';
}
 
export default function RankingPieChart(
    { rankings }: {rankings: {
        historicalPercent: number;
        bestSpec: string;
    }[]
}) {

    // Register the ChartJS specific elements we will use
    Chart.register(
        ArcElement,
        Tooltip
    );

    // Configuration options for the chart
    const rankingChartOptions = {
        clip: false as const,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    // Build up our datasets
    // Count of each job logged
    const rankingCounts: {
        [key: string]: number
    } = {};
    // Unique list of all jobs
    const rankingNames: string[] = [];
    // An array of colors to go with the jobs
    const rankingColorArray: string[] = [];
    rankings.forEach(ranking => {
        const rank = ranking.historicalPercent;
        if(rank < 25){
            const rankName = 'Grey';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (0-24)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(102, 102, 102, .7)');
            }
            rankingCounts[rankName]++;
        }
        else if(rank < 50){
            const rankName = 'Green';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (25-49)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(30, 255, 0, .7)');
            }
            rankingCounts[rankName]++;
        }
        else if(rank < 75){
            const rankName = 'Blue';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (50-74)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(0, 112, 255, .7)');
            }
            rankingCounts[rankName]++;
        }
        else if(rank < 95){
            const rankName = 'Purple';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (75-94)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(163, 53, 238, .7)');
            }
            rankingCounts[rankName]++;
        }
        else if(rank < 99){
            const rankName = 'Orange';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (95 - 98)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(255, 128, 0, .7)');
            }
            rankingCounts[rankName]++;
        }
        else if(rank < 100){
            const rankName = 'Pink';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (99)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(226, 104, 168, .7)');
            }
            rankingCounts[rankName]++;
        }
        else{
            const rankName = 'Gold';
            if(!rankingCounts[rankName]){
                rankingNames.push(rankName + ' (100)');
                rankingCounts[rankName] = 0;
                rankingColorArray.push('rgba(229, 204, 128, .7)');
            }
            rankingCounts[rankName]++;
        }
    });

    // Convert the Ranking count to an array
    const rankingCountArray: number[] = [];
    Object.keys(rankingCounts).forEach(rankName => {
        rankingCountArray.push(rankingCounts[rankName]);
    });

    // Build up our ChartJS data object
    let rankingChartData: {
        labels: string[];
        backgroundColor: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
            borderWidth: number;
            borderColor: string;
        }[];
    } = {
        labels: rankingNames,
        backgroundColor: rankingColorArray,
        datasets: [{
            data: rankingCountArray,
            backgroundColor: rankingColorArray,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, .4)'
        }]
    };
      
    return (
        <Pie
            options={rankingChartOptions}
            data={rankingChartData}
            height={"250px"}
        />
    )
}