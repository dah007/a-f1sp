import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { F1SP_BASE_DB_URL } from 'constants/constants';

// import { buildErrorObject } from 'utils/index';

type StringResponse = {
    value: [];
};

export const standingsApi = createApi({
    reducerPath: 'standingsApi',
    baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
    endpoints: (build) => ({
        getDriverStandings: build.query({
            query: (year: number = 2024) => `/driver-standings/year/${year}`,
            transformResponse: (response: StringResponse) => {
                console.log('?Driver Standings:', response.value);
                return response;
            },
        }),
        getConstructorStandings: build.query({
            query: (year: number = 2024) => `/standingsWithConstructors?year=${year}`,
            transformResponse: (response: unknown) => {
                console.log('Constructor Standings:', response);
                return response;
            },
        }),
        // getConstructorStandings: builder.query({
        //     queryFn: async (year: number = 2024) => {
        //         try {
        //             const data = await fetch(`/standingsWithConstructors?year=${year}`);
        //             return { data: data };
        //         } catch (error) {
        //             return buildErrorObject(error);
        //         }
        //     },
        // }),
        // getDriverStandings: builder.query({
        //     queryFn: async (year: number = 2024) => {
        //         console.log('year:', year);
        //         try {
        //             const data = await fetch(`/driver-standings/year/${year}`);
        //             console.log('DRIVER STANDINGS data:', data);
        //             return { data: data };
        //         } catch (error) {
        //             return buildErrorObject(error);
        //         }
        //     },
        // }),
    }),
});

export const { useGetConstructorStandingsQuery, useGetDriverStandingsQuery } = standingsApi;
