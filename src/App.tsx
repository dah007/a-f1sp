import { JSX, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { setRaceMaxYear, setSelectedYear } from 'slices/siteWideSlice';
import { useGetRaceMaxYearQuery } from './features/f1spRacesApi';
import { store, useAppDispatch } from './app/store';

// const Circuits = lazy(() => import('./routes/Circuits/Circuits'));
// const Constructors = lazy(() => import('./routes/Constructors'));
// const DriverDetail = lazy(() => import('./routes/DriverDetail'));
// const Drivers = lazy(() => import('./routes/Drivers'));
// const LoginForm = lazy(() => import('./components/LoginForm'));
// const Races = lazy(() => import('./routes/Races'));
// const Seasons = lazy(() => import('./routes/Seasons'));
// const Standings = lazy(() => import('./routes/Standings'));
// const VoteDnD = lazy(() => import('./routes/VoteDnD'));

import Header from 'components/Header';
import Home from './routes/Home';

import './App.css';
import 'styles/f1predict_custom.css';

const App = (): JSX.Element => {
    const dispatch = useAppDispatch();

    // const { data: dataRaceMaxYear } = useGetRaceMaxYearQuery<{ data: { year: number } }>('');

    // useEffect(() => {
    //     if (!dataRaceMaxYear) return;
    //     dispatch(setRaceMaxYear(dataRaceMaxYear.year));
    //     dispatch(setSelectedYear(dataRaceMaxYear.year));
    // }, [dataRaceMaxYear, dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Header />

                <main className="w-full h-[100vh] p-0 pl-6 pr-2 lg:pt-24 md:pt-16 sm:pt-14 pt-12">
                    <Home />
                    {/* <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="circuits" element={<Circuits />} />
                        <Route path="constructors/:year?" element={<Constructors />} />
                        <Route path="drivers/:year?" element={<Drivers />} />
                        <Route path="drivers/:year/driver/:id" element={<DriverDetail />} />
                        <Route path="login" element={<LoginForm />} />

                        <Route path="races/:year?/*" element={<Races />} />

                        <Route path="seasons/:year?" element={<Seasons />} />
                        <Route path="standings" element={<Standings />} />
                        <Route path="vote" element={<VoteDnD />} />
                        <Route
                            path="*"
                            element={
                                <div className="flex flex-col items-center justify-center h-[85vh]">
                                    <h1 className="mb-6 text-3xl font-bold">404 - Not Found</h1>
                                    <img
                                        className="max-w-[40%] rounded-3xl"
                                        src="assets/images/404.png"
                                        alt="404"
                                    />
                                </div>
                            }
                        />
                    </Routes> */}
                </main>
            </Router>
        </Provider>
    );
};

export default App;
