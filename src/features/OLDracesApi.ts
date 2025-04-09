import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { F1SP_BASE_DB_URL } from 'constants/constants';

import { buildErrorObject, dbFetch } from 'utils/index';

const baseYear = new Date().getFullYear();

export const racesApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
    endpoints: (builder) => ({
        getConstructors: builder.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const results = await dbFetch(`/constructors?year=${year}`);
                    return { data: results.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getFastestPitStop: builder.query({
            queryFn: async (raceId: number | string = 0) => {
                try {
                    const data = await dbFetch(`/fastestPitStop?raceId=${raceId}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRaceMaxYear: builder.query({
            queryFn: async () => {
                try {
                    const results = await dbFetch('/raceMaxYear');
                    return { data: results.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRaceNext: builder.query({
            queryFn: async () => {
                try {
                    const data = await dbFetch('/raceNext');
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRace: builder.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const data = await dbFetch(`/race?year=${year}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRaceResultsWithQual: builder.query({
            queryFn: async (raceId: number | string = 0) => {
                try {
                    const data = await dbFetch(`/raceResultsWithQual?id=${raceId}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getRacesResultsWithQual: builder.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const data = await dbFetch(`/racesResultsWithQual?year=${year}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getLastRaceResults: builder.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const data = await dbFetch(`/raceLastResults?year=${year}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),

        getLastResultsAtCircuit: builder.query({
            queryFn: async (circuitId: string = '') => {
                try {
                    const data = await dbFetch(`/previousResultsByCircuit?circuitId=${circuitId}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getTotalWins: builder.query({
            queryFn: async (year: number = baseYear) => {
                try {
                    const data = await dbFetch(`/totalWinsSeason?year=${year}`);
                    return { data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
    }),
    reducerPath: 'racesApi',
});

export const {
    useGetConstructorsQuery,
    useGetFastestPitStopQuery,
    useGetLastRaceResultsQuery,
    useGetLastResultsAtCircuitQuery,
    useGetRaceMaxYearQuery,
    useGetRaceNextQuery,
    useGetRaceQuery,
    useGetRaceResultsWithQualQuery,
    useGetRacesResultsWithQualQuery,
    useGetTotalWinsQuery,
    useLazyGetLastResultsAtCircuitQuery,
    useLazyGetRaceNextQuery,
} = racesApi;
