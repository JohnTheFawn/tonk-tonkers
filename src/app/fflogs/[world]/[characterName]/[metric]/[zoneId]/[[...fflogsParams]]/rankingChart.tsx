'use client'
 
import { useState } from 'react'
import { Chart, LinearScale, PointElement, TimeSeriesScale, Tooltip, Legend } from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import 'chartjs-adapter-moment'
import { ChartJsDataSet } from './interfaces'
 
export default function RankingChart(
    { rankings }: {rankings: {
        historicalPercent: number;
        startTime: number
    }[]
}) {
    Chart.register(
        LinearScale,
        PointElement,
        TimeSeriesScale,
        Tooltip,
        Legend
    );
    const rankingChartOptions = {
        clip: false as const,
        maintainAspectRatio: false,
        plugins: {
                legend: {
                display: false
            },
        },
        scales: {
            x: {
                type: 'timeseries' as const,
                time: {
                    unit: 'day' as const
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 100
            }
        }
    };


    let rankingChartData: {
        label: string;
        backgroundColor: string;
        datasets: {
            data: ChartJsDataSet[],
            backgroundColor: string;
        }[]
    } = {
        label: 'Rank',
        backgroundColor: '',
        datasets: []
    };

    const greyRankingDataset: ChartJsDataSet[] = [];
    const greenRankingDataset: ChartJsDataSet[] = [];
    const blueRankingDataset: ChartJsDataSet[] = [];
    const purpleRankingDataset: ChartJsDataSet[] = [];
    const orangeRankingDataset: ChartJsDataSet[] = [];
    const pinkRankingDataset: ChartJsDataSet[] = [];
    const goldRankingDataset: ChartJsDataSet[] = [];

    const rankingLabels = [];
    rankings.forEach(ranking => {
        const rankingData = {
            x: ranking.startTime,
            y: ranking.historicalPercent
        };
        if(ranking.historicalPercent < 25){
            greyRankingDataset.push(rankingData);
        }
        else if(ranking.historicalPercent < 50){
            greenRankingDataset.push(rankingData);
        }
        else if(ranking.historicalPercent < 75){
            blueRankingDataset.push(rankingData);
        }
        else if(ranking.historicalPercent < 95){
            purpleRankingDataset.push(rankingData);
        }
        else if(ranking.historicalPercent < 99){
            orangeRankingDataset.push(rankingData);
        }
        else if(ranking.historicalPercent < 100){
            pinkRankingDataset.push(rankingData);
        }
        else{
            goldRankingDataset.push(rankingData);
        }
        rankingLabels.push(ranking.historicalPercent)
    });

    rankingChartData.datasets = [
        {
            data: greyRankingDataset,
            backgroundColor: 'rgb(102, 102, 102)'
        },
        {
            data: greenRankingDataset,
            backgroundColor: 'rgb(30, 255, 0)'
        },
        {
            data: blueRankingDataset,
            backgroundColor: 'rgb(0, 122, 255)'
        },
        {
            data: purpleRankingDataset,
            backgroundColor: 'rgb(163, 53, 238)'
        },
        {
            data: orangeRankingDataset,
            backgroundColor: 'rgb(255, 128, 0)'
        },
        {
            data: pinkRankingDataset,
            backgroundColor: 'rgb(226, 104, 168)'
        },
        {
            data: goldRankingDataset,
            backgroundColor: 'rgb(229, 204, 128)'
        }
    ];
      
    return (
        <Scatter
            options={rankingChartOptions}
            data={rankingChartData}
            height={"250px"}
        />
    )
}