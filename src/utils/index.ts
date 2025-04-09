import { F1SP_BASE_DB_URL } from '../constants/constants';

export interface ErrorObject {
    data: string | unknown;
    status: string;
};

/**
 * Builds an error object from the given error.
 *
 * @param error - The error to process. It can be of any type.
 * @returns An object containing the error status and data. If the error has a `status` property, it will be used as the error status. Otherwise, 'CUSTOM_ERROR' will be used. If the error has a `statusText` property, it will be used as the error data. Otherwise, the entire error object will be used as the error data.
 */
export const buildErrorObject = (error: unknown): ErrorObject => {
    const errorStatus = (error as { status?: string }).status;
    const errorStatusText = (error as { statusText?: string }).statusText;

    return { status: errorStatus || 'UNKNOWN_ERROR', data: errorStatusText || error };
};

/**
 * Combines multiple class names into a single string.
 * @deprecated use `cn`
 * @param classes - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Closes any currently focused dropdown by blurring the active element.
 * This function targets the active element in the document and removes focus from it.
 */
export const closeDropdown = () => {
    (window.document.activeElement as HTMLElement)?.blur();
};

/**
 * Checks if a value exists in the local storage based on the provided storage key.
 *
 * @param storageKey - The key used to retrieve the value from the local storage.
 * @returns The value stored in the local storage, or `null` if the key is not found.
 */
export const checkLocalStorage = (storageKey: string) => {
    if (!storageKey) return null;
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
};

export function checkImageExists(url: string) {
    console.log(`image ${url}`);
    const img = new Image();
    img.src = url;

    if (!url) return false;
    if (img.onload) {
        return true;
    }
    if (img.onerror) {
        return false;
    }
}

/**
 * Formats a given date into a string with the format 'MM/DD/YYYY, HH:MM:SS AM/PM'.
 * If no date is provided, the current date and time will be used.
 *
 * @param {string | number | Date} [date] - The date to format. Can be a string, number, or Date object.
 * @returns {string} The formatted date string.
 */
export const dateFormat = (date?: string | number | Date) => {
    const dateToFormat = date ? new Date(date) : new Date();

    const formatted = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(dateToFormat);

    return formatted;
};

/**
 * Fetch's data from an endpoint attached to the F1SP
 * @param endPoint The api end point to hit
 * @param api Base url, defaulted to constant F1SP_BASE_DB_URL
 * @returns An array of objects
 */
export const dbFetch = async (endPoint: string, api: string = F1SP_BASE_DB_URL) => {
    let response;

    // ?
    // ? this is a bit of a hot mess, should be refactored
    // ?
    if (api === F1SP_BASE_DB_URL) {
        response = await fetch(`${F1SP_BASE_DB_URL}${endPoint}`);
    } else {
        // NOTE: currently open f1 api isn't implemented
        // response = await fetch(`${OPEN_F1_BASE_API_URL}${endPoint}`);
        throw new Error("Open F1 API is not implemented.");
    }

    if (!response) {
        throw new Error("No response received from the API.");
    }

    if (!response.ok) {
        // If the response is not ok, return an error
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            },
        };
    }

    const data = await response.json();


    if (!data) {
        throw new Error('No data returned from the API.');
    }

    return {
        data,
    };
};

/**
 * DB Local Storage Fetch
 * Pulls data from local storage for key @storageKey, than from url @url
 * @deprecated
 * @param url
 * @param storageKey
 * @returns object[]
 */
export const dbLocalStorageFetch = async (url: string, storageKey: string) => {
    const storedData = checkLocalStorage(storageKey);

    if (storedData) {
        return { data: JSON.parse(storedData) };
    }

    // If not found in local storage, fetch from the API
    // try {
    const response = await fetch(`${F1SP_BASE_DB_URL}${url}`);

    if (!response.ok) {
        // If the response is not ok, return an error
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            },
        };
    }

    const data = await response.json();

    if (data.MRData) {
        // Store the fetched data in local storage
        localStorage.setItem(storageKey, JSON.stringify(data.MRData));
    } else if (data) {
        // Store the fetched data in local storage
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    // Return the fetched data
    return { data: data?.MRData || data };
};

/**
 * Checks if the provided text is a valid JSON string.
 *
 * @param text - The text to be checked.
 * @returns `true` if the text is a valid JSON string and represents an object, otherwise `false`.
 */
// This is a JSON parsing function, so the type of the input is unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isJSON = (text: any) => {
    if (typeof text !== 'string') {
        return false;
    }
    try {
        const json = JSON.parse(text);
        return typeof json === 'object';
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * Stores the current route object in the local storage.
 *
 * @param route - The route object to be stored.
 */
export const storeCurrentRoute = (route: object) => {
    localStorage.removeItem('currentRoute');
    console.log(route);
    localStorage.setItem('currentRoute', JSON.stringify(route));
};

/**
 * Does what it says on the tin
 * @returns The current year as a string
 */
export const yearAsString: string = new Date().getFullYear().toString();

