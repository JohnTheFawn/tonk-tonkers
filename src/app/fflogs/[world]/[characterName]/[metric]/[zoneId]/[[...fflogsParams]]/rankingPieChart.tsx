'use client'
 
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

/**
 * Get an rgba color given a ranking
 * 
 * @param ranking The ranking to get a color for
 * @returns The color corresponding to the given ranking
 */
function getRankingColor(ranking: number){
    if(ranking < 25){
        return '102, 102, 102';
    }
    if(ranking < 50){
        return '30, 255, 0';
    }
    if(ranking < 75){
        return '0, 112, 255';
    }
    if(ranking < 95){
        return '163, 53, 238';
    }
    if(ranking < 99){
        return '255, 128, 0';
    }
    if(ranking < 100){
        return '226, 104, 168';
    }
    return '229, 204, 128';
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
    const sliceOpacity = '.7';
    rankings.forEach(ranking => {
        const rank = ranking.historicalPercent;
        let rankName = 'Gold (100%)';
        if(rank < 25){
            rankName = 'Grey (<25%)';
        }
        else if(rank < 50){
            rankName = 'Green (25% - 49%)';
        }
        else if(rank < 75){
            rankName = 'Blue (50% - 74%)';
        }
        else if(rank < 95){
            rankName = 'Purple (75% - 94%)';
        }
        else if(rank < 99){
            rankName = 'Orange (95% - 98%)';
        }
        else if(rank < 100){
            rankName = 'Pink (99%)';
        }
        if(!rankingCounts[rankName]){
            rankingNames.push(rankName);
            rankingCounts[rankName] = 0;
            rankingColorArray.push(`rgba(${getRankingColor(rank)}, ${sliceOpacity})`);
        }
        rankingCounts[rankName]++;
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