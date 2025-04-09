import type { RouteProps } from 'components/CustomLink';

// ? NEEDED?
export const BASE_URL = 'https://f1sp.mysql.database.azure.com/api'; // 'http://localhost:4280/data-api/api';

export const BUTTON_CLASSES =
    'border-2 border-gray-300 bg-sky-950 hover:bg-sky-600 text-white hover:text-black cursor-pointer';

export const DEBUG = import.meta.env.VITE_DEBUG;
export const DESCRIPTION = import.meta.env.VITE_DESCRIPTION;

// TODO: if possible trim this down to just the necessary elements
export const EMPTY_RACE = {
    raceDisplayOrder: 0,
    raceName: '',
    race_gap: null,
    place_name: '',
    qualifying_q1: '',
    qualifying_q2: '',
    qualifying_q3: '',
    qualDisplayOrder: 0,
    startDateTime: '',
    id: 0,
    year: 2024,
    round: 0,
    date: '0',
    time: '0',
    grand_prix_id: '',
    official_name: '',
    qualifying_format: '',
    sprint_qualifying_format: null,
    circuit_id: '',
    circuit_type: '',
    course_length: 0,
    countryCode: '',
    laps: 0,
    race_time: '',
    distance: 0,
    scheduled_laps: null,
    scheduled_distance: null,
    pre_qualifying_date: null,
    pre_qualifying_time: null,
    free_practice_1_date: '',
    free_practice_1_time: '',
    free_practice_2_date: '',
    free_practice_2_time: '',
    free_practice_3_date: '',
    free_practice_3_time: '',
    free_practice_4_date: null,
    free_practice_4_time: null,
    qualifying_1_date: null,
    qualifying_1_time: null,
    qualifying_2_date: null,
    qualifying_2_time: null,
    qualifying_date: '',
    qualifying_time: '',
    race_points: 0,
    sprint_qualifying_date: null,
    sprint_qualifying_time: null,
    sprint_race_date: null,
    sprint_race_time: null,
    warming_up_date: null,
    warming_up_time: null,
};
// export const F1SP_BASE_DB_URL = import.meta.env.VITE_F1SP_BASE_DB_URL;
// TODO: rename this and use base_url as the... well... base url

export const F1SP_BASE_DB_URL = 'http://127.0.0.1:4280/data-api/rest';

//  export const F1SP_BASE_DB_URL = 'https://f1sp.mysql.database.azure.com/data-api/api';

export const FONT_SIZE = {
    'text-sm': 'text-sm',
    'text-md': 'text-md',
    'text-lg': 'text-lg',
};

export const MENU: RouteProps[] = [
    {
        parent: { path: '', label: '' },
        path: '/',
        label: 'Home',
        hidden: true,
    },
    {
        parent: { path: '', label: '' },
        path: 'vote',
        label: 'Vote',
    },
    {
        parent: { path: '', label: '' },
        path: 'leaderboard',
        label: 'Leaderboard',
    },
    {
        parent: { path: '', label: '' },
        path: 'drivers',
        label: 'Drivers',
        hidden: false,
    },
    {
        parent: { path: '', label: '' },
        path: 'driver',
        label: 'Driver',
        hidden: true,
    },
    {
        parent: { path: '', label: '' },
        path: 'races',
        label: 'Races',
    },
    {
        parent: { path: '', label: '' },
        path: 'race',
        label: 'Race',
        hidden: true,
    },
    {
        parent: { path: '', label: '' },
        path: 'constructors',
        label: 'Constructors',
    },
    {
        parent: { path: '', label: '' },
        path: 'seasons',
        label: 'Seasons',
    },
    {
        parent: { path: '', label: '' },
        path: 'standings',
        label: 'Standings',
    },
    {
        parent: { path: '', label: '' },
        path: 'circuits',
        label: 'Circuits',
    },
];

export const SITE_NAME: string = import.meta.env.VITE_SITE_NAME;

export type FontSizeKeys = keyof typeof FONT_SIZE;

export const YEAR = new Date().getFullYear();
