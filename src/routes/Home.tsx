import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'app/store';

import CardBox from 'components/CardBox';
import DriverOfTheDay from 'components/DriverOfTheDay';
import DriverStandings from 'components/DriverStandings';
import ErrorDialog from 'components/ErrorDialog';
import LastRaceResultsPod from 'components/LastRaceResultsPod';
import LastRacesAtCircuit from 'components/LastRacesAtCircuit';
import NextReactBanner from 'components/NextRaceBanner';
import NextYearSchedule from 'components/NextYearSchedule';
import TotalWinsPod from 'components/TotalWinsPod';

import { setError } from 'slices/siteWideSlice';
import { setPreviousResultsAtCircuit } from 'slices/racesSlice';
import { useGetLastResultsAtCircuitQuery } from 'features/f1spRacesApi';

import { YEAR } from 'constants/constants';

import type { RaceResultProps } from 'types/races';

const year: number = YEAR;
// const nextYear: number = year + 1;

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const lastRaceResults: RaceResultProps[] = useAppSelector((state: RootState) => state.races.lastRaceResults ?? []);

    // const { data: dataLastRacesAtCircuit, isError: errorLastRacesAtCircuit } = useGetLastResultsAtCircuitQuery({});

    const systemError = useAppSelector((state) => state.siteWide.error);

    const lastSeason = useAppSelector((state) => state.siteWide.lastSeason) ?? YEAR - 1;

    // useEffect(() => {
    //     if (errorLastRacesAtCircuit) {
    //         setError(true);
    //     }
    // }, [errorLastRacesAtCircuit]);

    // useEffect(() => {
    //     if (!dataLastRacesAtCircuit) return;
    //     console.log('dataLastRacesAtCircuit', dataLastRacesAtCircuit);
    //     dispatch(setPreviousResultsAtCircuit(dataLastRacesAtCircuit));
    // }, [dispatch, dataLastRacesAtCircuit]);

    return (
        <>
            {/* <NextReactBanner /> */}
            {systemError && <ErrorDialog />}

            <div className="flex flex-col justify-center items-center mr-2">
                <div
                    className="
                lg:grid
                lg:grid-cols-3
                lg:grid-rows-2

                md:flex
                md:flex-col

                sm:flex
                sm:flex-col
                gap-4

                flex
                flex-col                
                lg:w-[80vw]                
                md:w-[90vw]
                w-[90vw]"
                >
                    <LastRaceResultsPod year={year} />
                    {/* <div className="row-start-1 col-start-1 w-full">
                        <CardBox
                            classes="overflow-hidden h-[30vh]"
                            bodyClasses="w-full m-0 p-0 h-[30vh]"
                            content={<LastRaceResultsPod year={year} />}
                            title={`Last Race: ${lastRaceResults && lastRaceResults[0] ? lastRaceResults[0].short_name : 'N/A'}`}
                        />
                    </div>
                    <div className="col-start-3 row-start-2">
                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses={'w-full h-[20vh]'}
                            content={<LastRacesAtCircuit />}
                            title={`Previous Results at Circuit`}
                        />
                    </div>
                    <div className="col-span-2 col-start-3 row-start-1">
                        <CardBox
                            classes="min-h-[30vh] h-[30vh]"
                            content={<DriverOfTheDay />}
                            title={`Driver of the Day: ${lastRaceResults && lastRaceResults[0] ? lastRaceResults[0].short_name : 'N/A'}`}
                            useScroll={false}
                        />
                    </div>
                    <div className="col-start-2 row-start-1">
                        <CardBox
                            classes="overflow-hidden max-h-[30vh] h-[30vh]"
                            content={<DriverStandings year={year} />}
                            title={`Driver Standings ${year}`}
                        />
                    </div>
                    <div className="row-start-2">
                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses="h-[20vh]"
                            content={<TotalWinsPod year={lastSeason ?? YEAR} />}
                            title={`${lastSeason} Wins`}
                        />
                    </div>
                    <div className="row-start-2 col-start-2">
                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses="h-[20vh]"
                            content={<TotalWinsPod year={lastSeason - 1} />}
                            title={`${lastSeason - 1} Wins`}
                        />
                    </div>

                    <div className="row-start-2 col-start-4">
                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses="h-[20vh]"
                            content={<NextYearSchedule />}
                            title={`Schedule`}
                        />
                    </div> */}
                </div>

                {/* <div className="flex flex-col justify-center items-center mr-2">
                <div
                    className="
                        mt-10
                        flex 
                        flex-col 
                        gap-4
                        grid-rows-3 

                        lg:grid 
                        lg:grid-cols-3 
                        
                        sm:w-[96vw] 
                        md:w-[90vw]
                        lg:w-[80vw]
                        
                        w-[90vw]
                "
                >
                    <div className="row-span-3 left flex flex-col gap-4">
                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses={'w-full h-[20vh]'}
                            content={<LastRacesAtCircuit />}
                            title={`Previous Results at Circuit`}
                        />

                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            content={<NextYearSchedule />}
                            title={`${year !== lastSeason ? year : nextYear} Schedule`}
                        />

                        <CardBox
                            classes="overflow-hidden h-[20vh]"
                            bodyClasses="w-full m-0 p-0 h-[20vh]"
                            content={<LastRaceResultsPod year={year} />}
                            title={`Last Race: ${lastRaceResults && lastRaceResults[0] ? lastRaceResults[0].short_name : 'N/A'}`}
                        />
                    </div>
                    <div className="col-span-2 h-[20vh] max-h-[20vh]">
                        <CardBox
                            classes="overflow-hidden max-h-[20vh] h-[20vh]"
                            bodyClasses={'h-[20vh]'}
                            content={<DriverOfTheDay />}
                            title={`Driver of the Day: ${lastRaceResults && lastRaceResults[0] ? lastRaceResults[0].short_name : 'N/A'}`}
                        />
                    </div>
                    <div className="row-span-2 col-start-2 row-start-2 center flex gap-2 flex-col">
                        <CardBox
                            classes="overflow-hidden"
                            bodyClasses="h-[20vh]"
                            content={<TotalWinsPod year={lastSeason ?? YEAR} />}
                            title={`${lastSeason} Wins`}
                        />
                        <CardBox
                            classes="overflow-hidden"
                            bodyClasses="h-[20vh]"
                            content={<TotalWinsPod year={lastSeason - 1} />}
                            title={`${lastSeason - 1} Wins`}
                        />
                    </div>
                    <div className="row-span-2 col-start-3 row-start-2">
                        <CardBox
                            classes={['overflow-hidden', 'h-[40vh] max-h-[40vh]']}
                            content={<DriverStandings year={year} />}
                            title={`Driver Standings ${year}`}
                        />
                    </div>
                </div>
            </div> */}
            </div>
        </>
    );
};

export default Home;
