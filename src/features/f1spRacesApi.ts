import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { F1SP_BASE_DB_URL } from 'constants/constants';

import { buildErrorObject, dbFetch } from 'utils/index';

const baseYear = new Date().getFullYear();

const BASE_URL = 'http://127.0.0.1:4280/data-api/rest';

export const f1spRacesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
    endpoints: (build) => ({
        getDriverOfTheDay: build.query({
            query: () => `/driver-of-day`,
            transformResponse: (response: unknown) => {
                console.log('????????????????????????? Driver of the day:', response);
                return response;
            },
        }),
        getFastestLap: build.query({
            queryFn: async (raceId: number | string = '') => {
                try {
                    const data = await dbFetch(`${BASE_URL}/fastest-lap/raceId/${raceId}`);
                    return { data: data.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getFastestPitStop: build.query({
            queryFn: async (raceId: number | string = '') => {
                try {
                    const data = await dbFetch(`${BASE_URL}/fastestPitStop?raceId=${raceId}`);
                    return { data: data.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getLastRaceResults: build.query({
            query: () => `/race-result/race_id/1127`,
            // transformResponse: (response: unknown) => {
            //     console.log('????????????????????????? RACE REACE RESI:TS@!:', response.value);
            //     return {
            //         data: response,
            //     };
            // },
            // queryFn: async () => {
            //     console.log('getLastRaceResults??');
            //     try {
            //         console.log('getLastRaceResults');
            //         const returnData = await fetch(`${BASE_URL}/race-result/race_id/1127`);
            //         console.log('returnData', returnData);
            //         return { data: returnData };
            //     } catch (error) {
            //         return buildErrorObject(error);
            //     }
            // },
        }),
        // getLastResultsAtCircuit: build.query({
        //     queryFn: async () => {
        //         try {
        //             const returnData = await fetch(`/previous-results/circuit_id/1127`);
        //             console.log('PREVIOUS RESULTS returnData', returnData);
        //             return { data: returnData.body };
        //         } catch (error) {
        //             return buildErrorObject(error);
        //         }
        //     },
        // }),
        getRaceMaxYear: build.query({
            queryFn: async () => {
                try {
                    const results = await fetch('/race-latest-year');
                    return { data: results.body };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getPointsByRace: build.query({
            query: (year: number = 2024) => `/pointsByRace?year=${year}`,
        }),
        getPollPosition: build.query({
            queryFn: async (raceId: number | string = '') => {
                try {
                    const data = await dbFetch(`/pollPosition?raceId=${raceId}`);
                    return { data: data.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRace: build.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const data = await fetch(`${BASE_URL}/race?year=${year}`);
                    return { data: data.body };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRaceNext: build.query({
            query: (year: number) => `/race-next/year/${year}`,
        }),
        // getRaceNext: build.query({
        //     queryFn: async (year: number) => {
        //         try {
        //             const data = await fetch(`/race-next/year/${year}`);
        //             console.log('------------------------->data', data);
        //             return { data: data };
        //         } catch (error) {
        //             return buildErrorObject(error);
        //         }
        //     },
        // }),
        getRaceResultsPrevious: build.query({
            queryFn: async (circuitId: string) => {
                try {
                    const data = await dbFetch(`/getRaceLastResults?circuitId=${circuitId}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRaceResultsWithQual: build.query({
            queryFn: async (id: string) => {
                try {
                    const data = await dbFetch(`/raceResultsWithQual?id=${id}`);
                    return { data: data.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRacesResultsWithQual: build.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const results = await dbFetch(`/racesResultsWithQual?year=${year}`);
                    return { data: results.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getTotalWins: build.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const results = await fetch(`/season-total-wins?year=${year}`);
                    return { data: results.body };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
    }),
});

export const {
    useGetDriverOfTheDayQuery,
    useGetFastestLapQuery,
    useGetFastestPitStopQuery,
    useGetLastRaceResultsQuery,
    useGetLastResultsAtCircuitQuery,
    useGetPointsByRaceQuery,
    useGetPollPositionQuery,
    useGetRaceMaxYearQuery,
    useGetRaceNextQuery,
    useGetRaceQuery,
    useGetRaceResultsPreviousQuery,
    useGetRaceResultsWithQualQuery,
    useGetRacesResultsWithQualQuery,
    useGetTotalWinsQuery,
} = f1spRacesApi;
