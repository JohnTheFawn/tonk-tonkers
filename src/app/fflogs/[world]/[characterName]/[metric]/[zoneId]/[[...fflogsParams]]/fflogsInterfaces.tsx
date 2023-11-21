import { Key } from 'react';

export interface FFLogsAllStarRanking {
    encounter: {
        id: Key;
        name: string;
    };
    rankPercent: number;
    medianPercent: number;
    totalKills: number;
    fastestKill: number;
    bestSpec: string;
    allStars: {
        points: number;
        rank: number;
        total: number;
    };
};