const YEAR = new Date().getFullYear();
/**
 * Generates SQL to retrieve all circuits and the last race there in the past decade.
 * @returns {string} The SQL query string to retrieve circuit information.
 */
const getCircuits = () => `
    WITH LatestRace AS (
        SELECT
            r.circuit_id,
            MAX(r.date) AS latest_date
        FROM
            race r
        WHERE
            r.year <= ${YEAR}
            AND r.year >= ${YEAR - 10}
        GROUP BY
            r.circuit_id
    )
    SELECT
        c.place_name,
        c.id,
        r.date,
        DATE_FORMAT(r.date, '%e-%b-%y') AS raceDate,
        r.official_name,
        c.name AS shortName,
        c.full_name,
        c.type AS circuitType,
        cc.name AS country,
        c.latitude,
        c.longitude
    FROM
        circuit c
    LEFT JOIN
        race r ON c.id = r.circuit_id
    INNER JOIN
        country cc ON c.country_id = cc.id
    INNER JOIN
        LatestRace lr ON r.circuit_id = lr.circuit_id AND r.date = lr.latest_date
    ORDER BY
        c.place_name, r.date DESC;
`;

/**
 * Generates SQL to retrieve the fastest lap time for each circuit since the year 2000.
 * The SQL selects the minimum lap time, circuit ID, driver ID, driver's full name, and race date.
 *
 * @returns {string} The SQL query string.
 */
const getFastestLap = () => `
        SELECT 
            min(fl.time) time, c.id circuit_id, fl.driver_ID, d.full_name, rl.date
        FROM 
            fastest_lap fl
        INNER JOIN race r 
            on fl.race_id = r.id AND r.date > '2000-01-01'
        INNER JOIN driver d 
            on fl.driver_id = d.id
        INNER JOIN circuit c 
            on r.circuit_id = c.id
        GROUP BY circuit_id
    `;

/**
 * Generates SQL to get the fastest pit stop for a given race.
 *
 * @param {number} raceId - The ID of the race.
 * @returns {string} The SQL query string to get the fastest pit stop.
 */
const getFastestPitstop = (raceId) => `
    SELECT 
            min(pit_stop_time_millis) fastestPit, pit_stop_time, driver_id
    FROM    race_data
    WHERE   race_data.type = 'PIT_STOP'
            AND race_id = ${raceId}
    GROUP BY pit_stop_time_millis, pit_stop_time, driver_id
    LIMIT 1;
`;

/**
 * Generates SQL to retrieve the previous race results for a given circuit.
 *
 * @param {string} circuitId - The ID of the circuit to retrieve results for.
 * @returns {string} The SQL query string to get the previous race results by circuit.
 */
const getPreviousResultsByCircuit = (circuitId) => `
    SELECT  r.year, d.full_name, d.permanent_number, rr.time
    FROM    race r
    INNER JOIN race_result rr
            ON r.id = rr.race_id
    INNER JOIN driver d
            ON rr.driver_id = d.id
    WHERE   r.circuit_id =
        (
            SELECT
                r.circuit_id
            FROM
                race r
            WHERE r.date > NOW()
            ORDER BY
               r.date ASC
            LIMIT 1
        )
        AND rr.position_number = 1
     ORDER BY r.year DESC
     LIMIT 5;
`;

module.exports = {
    getCircuits,
    getFastestLap,
    getFastestPitstop,
    getPreviousResultsByCircuit,
};
