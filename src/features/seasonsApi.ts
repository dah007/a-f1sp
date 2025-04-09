import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { F1SP_BASE_DB_URL } from 'constants/constants';

import { dbFetch } from 'utils/index';

export const seasonsApi = createApi({
    reducerPath: 'seasonsApi',
    baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
    endpoints: (builder) => ({
        getConstructorSeasons: builder.query({
            queryFn: async (arg) => {
                const year = arg ?? 2024;
                const result = await dbFetch(`/standingsWithConstructors?year=${year}`);
                return { data: result };
            },
        }),
        getDriverSeasons: builder.query({
            queryFn: async (arg) => {
                const year = arg ?? 2024;
                const result = await fetch(`/standings-with-drivers/year/${year}`);
                return { data: result.body };
            },
        }),
        getLatestSeasonYear: builder.query({
            queryFn: async () => {
                const result = await dbFetch(`/seasonLatestYear`);
                console.log('result', result);
                return { data: result.data[0].year };
            },
        }),
        getSeasonStats: builder.query({
            queryFn: async () => {
                const result = await dbFetch(`/seasonStats`);
                return { data: result };
            },
        }),
    }),
});

export const {
    useGetConstructorSeasonsQuery,
    useGetDriverSeasonsQuery,
    useGetLatestSeasonYearQuery,
    useGetSeasonStatsQuery,
} = seasonsApi;
