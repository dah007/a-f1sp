import { JSX, useEffect } from 'react';

import CustomLink from './CustomLink';

import { useGetLastRaceResultsQuery } from '../features/f1spRacesApi';

import type { RaceResultProps } from 'types/races';
import { YEAR } from 'constants/constants';
import { RootState, useAppDispatch, useAppSelector } from 'app/store';
import { setLastRaceResults } from 'slices/racesSlice';
import CardLoading from './CardLoading';
import { setError } from 'slices/siteWideSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

/**
 * Component to display the last race results in a tabular format.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} [props.year=YEAR] - The year for which to fetch the last race results.
 * @returns {JSX.Element} A JSX element displaying the last race results.
 *
 * @example
 * <LastRaceResultsPod year={2023} />
 *
 * @remarks
 * This component uses Redux for state management and RTK Query for data fetching.
 * It dispatches actions to set the last race results and handle errors.
 * The component displays a loading state while fetching data and shows a message if no data is available.
 *
 * @requires useAppDispatch
 * @requires useAppSelector
 * @requires useGetLastRaceResultsQuery
 * @requires setLastRaceResults
 * @requires setError
 * @requires CardLoading
 * @requires Table
 * @requires TableHeader
 * @requires TableRow
 * @requires TableHead
 * @requires TableBody
 * @requires TableCell
 * @requires CustomLink
 */
function LastRaceResultsPod({ year = YEAR }: { year?: number }): JSX.Element {
    const dispatch = useAppDispatch();
    const raceResults: RaceResultProps[] = useAppSelector((state: RootState) => state.races.lastRaceResults) ?? [];

    const { data, isLoading, isError } = useGetLastRaceResultsQuery(year);

    useEffect(() => {
        console.log('data', data);
        if (isLoading) {
            dispatch(setLastRaceResults([]));
        }
        if (isError) {
            dispatch(setError(true));
        }
        if (!data) return;
        const dataResults = data?.value as RaceResultProps[] | undefined;

        console.log('dataResults', dataResults);

        dispatch(setLastRaceResults(dataResults!));
    }, [data, isLoading, isError, dispatch]);

    if (isError) {
        dispatch(setError(true));
    }

    // if (!raceResults) return <div />;

    const RaceResults = ({ raceResults }: { raceResults: RaceResultProps[] }) => {
        if (!raceResults) return null;
        if (!Array.isArray(raceResults)) return null;
        if (raceResults?.length === 0) {
            return (
                <TableRow>
                    <TableHead colSpan={3} className="text-center">
                        No data available
                    </TableHead>
                </TableRow>
            );
        }
        return raceResults?.map((race: RaceResultProps) => {
            return (
                <TableRow key={race.permanent_number}>
                    <TableCell className="w-4 text-right">{race.position_number}</TableCell>
                    <TableCell className="w-4 text-right">{race.permanent_number}</TableCell>
                    <TableCell>
                        <CustomLink
                            route={{
                                parent: {
                                    path: `/drivers/${year}`,
                                    label: `Drivers ${year}`,
                                },
                                path: `/drivers/2024/driver/${race.driver_id}`,
                                label: race.full_name as unknown as string,
                            }}
                        />
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <div className="flex flex-col gap-1">
            <CardLoading isLoading={((!raceResults || raceResults?.length === 0) as unknown as boolean) || isLoading} />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4 text-right">? Pos</TableHead>
                        <TableHead className="w-4 text-right">No</TableHead>
                        <TableHead>Driver</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RaceResults raceResults={raceResults} />
                </TableBody>
            </Table>
        </div>
    );
}

// const LastRaceResultsPod = () => {
//     // Using the query hook to fetch data
//     const { data, error, isLoading } = useGetLastRaceResultsQuery(1127);

//     if (isLoading) return <p>Loading...</p>; // Show loading state
//     if (error) return <p>Error occurred:</p>; // Handle errors
//     if (!data) return <p>No data available</p>; // Handle case with no data

//     return (
//         <div>
//             <h1>Last Race Results</h1>
//             <ul>
//                 {data.map((result: { id: string; driverName: string; position: number }) => (
//                     <li key={result.id}>
//                         {result.driverName} - {result.position}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

export default LastRaceResultsPod;
