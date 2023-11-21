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

export interface FFLogsEncounterRanking {
    historicalPercent: number;
    todayPercent: number;
    historicalTotalParses: number;
    todayTotalParses: number;
    report: {
      code: string;
    };
    duration: number;
    spec: string;
    rDPS: number;
    amount: number;
    bestSpec: string;
    startTime: number;
};