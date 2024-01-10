import { Key } from 'react';

export interface FFLogsZoneRanking {
    encounter: {
        id: Key;
        name: string;
    };
    rankPercent: number;
    medianPercent: number;
    totalKills: number;
    fastestKill: number;
    bestSpec: string;
    spec: string;
    allStars: {
        points: number;
        rank: number;
        total: number;
    };
};

export interface FFLogsReport {
    code: string;
    startTime: number;
    fightID: number;
}

export interface FFLogsEncounterRanking {
    historicalPercent: number;
    todayPercent: number;
    historicalTotalParses: number;
    todayTotalParses: number;
    report: FFLogsReport;
    duration: number;
    spec: string;
    rDPS: number;
    amount: number;
    bestSpec: string;
    startTime: number;
};