'use client'
 
import { Chart, ArcElement, Tooltip, Interaction } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

/**
 * Get an rgba color given a Job
 * 
 * @param job The Job to get a color for
 * @returns The color corresponding to the given job
 */
function getJobColor(job: string){
    const parsedJob = job.toLowerCase();
    if(parsedJob == 'astrologian'){
        return 'rgba(255, 231, 74, .7)';
    }
    else if(parsedJob == 'bard'){
        return 'rgba(171, 212, 120, .7)';
    }
    else if(parsedJob == 'blackmage'){
        return 'rgba(165, 121, 214, .7)';
    }
    else if(parsedJob == 'dancer'){
        return 'rgba(242, 192, 191, .7)';
    }
    else if(parsedJob == 'darkknight'){
        return 'rgba(224, 52, 220, .7)';
    }
    else if(parsedJob == 'dragoon'){
        return 'rgba(65, 100, 205, .7)';
    }
    else if(parsedJob == 'gunbreaker'){
        return 'rgba(153, 141, 80, .7)';
    }
    else if(parsedJob == 'machinist'){
        return 'rgba(110, 225, 214, .7)';
    }
    else if(parsedJob == 'monk'){
        return 'rgba(230, 172, 0, .7)';
    }
    else if(parsedJob == 'ninja'){
        return 'rgba(191, 41, 116, .7)';
    }
    else if(parsedJob == 'paladin'){
        return 'rgba(184, 226, 246, .7)';
    }
    else if(parsedJob == 'reaper'){
        return 'rgba(150, 90, 144, .7)';
    }
    else if(parsedJob == 'redmage'){
        return 'rgba(232, 155, 155, .7)';
    }
    else if(parsedJob == 'sage'){
        return 'rgba(144, 176, 255, .7)';
    }
    else if(parsedJob == 'samurai'){
        return 'rgba(228, 109, 4, .7)';
    }
    else if(parsedJob == 'scholar'){
        return 'rgba(166, 119, 255, .7)';
    }
    else if(parsedJob == 'summoner'){
        return 'rgba(45, 155, 120, .7)';
    }
    else if(parsedJob == 'warrior'){
        return 'rgba(255, 70, 65, .7)';
    }
    else if(parsedJob == 'whitemage'){
        return 'rgba(255, 255, 255, .7)';
    }
    return 'rgba(255, 255, 255, .25)';
}
 
export default function JobPieChart(
    { rankings, currentPath }: {
        rankings: {
            bestSpec: string;
        }[];
        currentPath: string;
    }
    ) {

    // Register the ChartJS specific elements we will use
    Chart.register(
        ArcElement,
        Tooltip
    );

    // Build up our datasets
    // Count of each job logged
    const jobCounts: {
        [key: string]: number
    } = {};
    // Unique list of all jobs
    const jobs: string[] = [];
    // An array of colors to go with the jobs
    const jobColorArray: string[] = [];
    rankings.forEach(ranking => {
        const job = ranking.bestSpec;
        if(!jobCounts[job]){
            jobs.push(job.replace(/([A-Z])/g, ' $1').trim());
            jobCounts[job] = 0;
            jobColorArray.push(getJobColor(job));
        }
        jobCounts[job]++;
    });

    // Convert the Job count to an array
    const jobCountArray: number[] = [];
    Object.keys(jobCounts).forEach(job => {
        jobCountArray.push(jobCounts[job]);
    });

    // Configuration options for the chart
    const jobChartOptions = {
        clip: false as const,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        onClick: function(event: any, item: { index: number; }[]){
            if(item[0]){
                window.location.href = `${currentPath}/${jobChartData.labels[item[0].index]}`;
            }
        }
    };

    // Build up our ChartJS data object
    let jobChartData: {
        labels: string[];
        backgroundColor: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
            borderWidth: number;
            borderColor: string;
        }[];
    } = {
        labels: jobs,
        backgroundColor: jobColorArray,
        datasets: [{
            data: jobCountArray,
            backgroundColor: jobColorArray,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, .4)'
        }]
    };
      
    return (
        <Pie
            key={`jobPieChart`}
            options={jobChartOptions}
            data={jobChartData}
            height={"250px"}
        />
    )
}