import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'app/store';
import { useGetRaceNextQuery } from '../features/f1spRacesApi';
import { YEAR } from 'constants/constants';
import { setRaceNext } from 'slices/racesSlice';
import CardLoading from './CardLoading';
import { setError } from 'slices/siteWideSlice';
import CountdownClock from './CountdownClock';

/**
 * Component to display the next race banner.
 *
 * @component
 * @returns {JSX.Element} A JSX element displaying the next race information or an empty fragment if no race details are provided.
 */
const NextReactBanner: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const raceNext = useAppSelector((state: RootState) => state.races.raceNext);

    const { data: raceNextData, isLoading: raceNextLoading, isError: raceNextError } = useGetRaceNextQuery(YEAR);

    useEffect(() => {
        if (!raceNextData) return;

        dispatch(setRaceNext(raceNextData));
    }, [dispatch, raceNextData]);

    if (raceNextLoading) return <CardLoading isLoading={raceNextLoading} />;
    if (raceNextError) dispatch(setError(true));

    const renderBanner = () => {
        if (!raceNext) return <CountdownClock targetDate={'03/14/2025 00:00:00'} />;

        return (
            <>
                <span>Next Race:</span> <span>{` ${raceNext.date || ''} @ `} </span>
                <span>{`${raceNext.short_name || 'N/A'}`}</span>
            </>
        );
    };

    return (
        <div
            className="
            flex 
            items-end 
            justify-center 
            gap-2 
            text-center 
            align-middle 
            raceNext 
            racingFont 
            lg:text-3xl 
            md:text-2xl
            text-xl
        "
        >
            {renderBanner()}
        </div>
    );
};

export default NextReactBanner;
