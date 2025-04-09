import React, { useEffect } from 'react';

import { setDriverStandings } from 'slices/standingsSlice';
import { setError } from 'slices/siteWideSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useGetDriverStandingsQuery } from '../features/standingsApi';

import { YEAR } from 'constants/constants';
import { intlNumberFormat } from '@/utils/number';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { IDriverStanding } from '@/types/standings';

interface DriverStandingProps {
    card?: boolean; // ? in the type definition for potential use later
    year?: number;
}

/**
 * Component to display the driver standings for a given year.
 *
 * @component
 * @param {DriverStandingProps} props - The properties for the component.
 * @param {number} [props.year=YEAR] - The year for which to fetch the driver standings.
 * @param {boolean} [props.card=false] - Flag to determine if the standings should be displayed in a card format.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <DriverStandings year={2024} card={true} />
 *
 * @remarks
 * This component fetches the driver standings data using the `useGetDriverStandingsQuery` hook and displays it in a table format.
 * If there is an error during data fetching, it dispatches an error action.
 *
 * @requires useAppDispatch
 * @requires useGetDriverStandingsQuery
 * @requires setError
 * @requires Titles
 * @requires CardLoading
 * @requires CustomLink
 */
const DriverStandings: React.FC<DriverStandingProps> = ({ year = YEAR }: DriverStandingProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const { data: dataDrivers, isError: error } = useGetDriverStandingsQuery(year);

    const driverStandings = useAppSelector((state) => state.standings.drivers);

    useEffect(() => {
        console.log('dataDriv2ers', dataDrivers);
        if (!dataDrivers) return;
        console.log('dataDrivers', dataDrivers);
        dispatch(setDriverStandings(dataDrivers));
    }, [dataDrivers, dispatch]);

    if (error) {
        dispatch(setError(true));
    }
    const Drivers = ({ drivers }: { drivers: IDriverStanding[] }) => {
        if (!drivers) return null;

        return driverStandings?.map((driver) => {
            return (
                <div className="flex w-full gap-4 border-b border-gray-200 p-2 pr-6" key={driver.driver_id}>
                    <div className="p-0 pl-4 w-8 text-right">{driver.position_number}</div>
                    <div className="flex-1">{driver.name}</div>
                    <div className="p-0 pr-8 w-8 text-right">{intlNumberFormat(driver.points)}</div>
                </div>
            );
        });
    };

    return (
        <div className="p-0 m-0">
            <div className="flex gap-4 p-2 pr-6 border-b border-gray-200">
                <div className="p-0 w-8 ">Pos</div>
                <div className="flex-1">Name</div>
                <div className="p-0 pr-8 w-8">Points</div>
            </div>

            {/* <div className="grid grid-cols-3 grid-rows-1 gap-2"> */}
            <ScrollArea className="w-full h-full">
                <ScrollBar />
                <Drivers drivers={driverStandings} />
            </ScrollArea>
        </div>
    );
};

export default DriverStandings;
