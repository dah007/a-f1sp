import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { F1SP_BASE_DB_URL } from 'constants/constants';
import { buildErrorObject, dbFetch } from 'utils/index';

/**
 * API service for fetching driver-related data from the F1 database.
 *
 * @remarks
 * This service provides various endpoints to fetch information about F1 drivers,
 * including their statistics, positions, podiums, wins, and more.
 *
 * @example
 * ```typescript
 * import { driversApi } from './features/driversApi';
 *
 * // Example usage:
 * const { data, error } = useGetDriverOfDayQuery('max-verstappen');
 * ```
 *
 * @public
 */
export const driversApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
    endpoints: (builder) => ({
        getDriverOfDay: builder.query({
            query: () => '/driver-of-day',
        }),
        getDriverTotalPositions: builder.query({
            query: (id: string = 'lando-norris') => `/driverPositionTotals?id=${id}`,
        }),
        getDriver: builder.query({
            query: (id: string = 'lando-norris') => `/driver?id=${id}`,
        }),
        getDrivers: builder.query({
            query: (year: string = '2024') => `/drivers?year=${year}`,
        }),
        getDriversByYear: builder.query({
            queryFn: async (year: number = 2024) => {
                try {
                    const data = await dbFetch(`/driversByYear?year=${year}`);
                    console.log('data:', data);
                    return { data: data.data };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getDriversByIds: builder.query({
            queryFn: async (drivers: string[]) => {
                const ids = drivers.join(',');
                const result = await dbFetch(`driversByIds?ids=${ids}`);
                return { data: result.data[0] };
            },
        }),
        getDriverPodiums: builder.query({
            query: (driverId: string = 'lando-norris') => `/driverPodiums?id=${driverId}`,
        }),
        getDriverStats: builder.query({
            queryFn: async (driverId: string = 'lando-norris') => {
                try {
                    const data = await dbFetch(`/driverStats?id=${driverId}`);
                    return { data: data.data[0] };
                } catch (error) {
                    return buildErrorObject(error);
                }
            },
        }),
        getDriverWins: builder.query({
            query: (driverId: string = 'lando-norris') => `/driverWins?id=${driverId}`,
        }),
    }),
    reducerPath: 'driversApi',
});

export const {
    useGetDriverOfDayQuery,
    useGetDriverPodiumsQuery,
    useGetDriverQuery,
    useGetDriverStatsQuery,
    useGetDriverTotalPositionsQuery,
    useGetDriverWinsQuery,
    useGetDriversByIdsQuery,
    useGetDriversByYearQuery,
    useGetDriversQuery,
} = driversApi;
