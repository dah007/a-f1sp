const getRaceMaxYear = () => `
    SELECT  max(r.year) year
    FROM    race_data rd
    INNER JOIN race r 
            ON rd.race_id = r.id
    WHERE   type = 'RACE_RESULT'
    ORDER BY race_id
`;

const getRaceFastestLap = (raceId) => `
    SELECT fl.time, d.full_name, fl.lap
    FROM fastest_lap fl
    INNER JOIN driver d
        ON fl.driver_id = d.id
    WHERE fl.position_number = 1
        AND fl.race_id = ${raceId}
`;

const getRaceFastestPitstop = (raceId) => `
    SELECT
        ps.time,
        d.full_name,
        d.permanent_number
    FROM
        pit_stop ps
    INNER JOIN driver d
        ON ps.driver_id = d.id
    INNER JOIN (
        SELECT
            race_id,
            MIN(time_millis) AS min_time
        FROM
            pit_stop
        GROUP BY
            race_id
    ) min_ps
        ON ps.race_id = min_ps.race_id
        AND ps.time_millis = min_ps.min_time
    WHERE ps.race_id = ${raceId}
    ORDER BY
        ps.race_id DESC;
`;

const getRaceLastResults = () => `
    SELECT 
        IFNULL(rr.position_number, '-') AS position_number, 
        d.full_name, d.permanent_number, rr.points, rr.time, gp.short_name
    FROM 
        race_result rr
    INNER JOIN driver d 
        ON rr.driver_id = d.id
    INNER JOIN race r
        ON rr.race_id = r.id 
    INNER JOIN grand_prix gp 
        ON r.grand_prix_id = gp.id 
    WHERE rr.race_id = (SELECT MAX(rr2.race_id) FROM race_result rr2)
    ORDER BY 
        rr.race_id DESC,
    CASE
        WHEN rr.position_number REGEXP '^[0-9]+$' THEN CAST(rr.position_number AS UNSIGNED)
        ELSE 999999999
    END;
`;

const getRaceNext = () => `
    SELECT
        r.id as raceId, gp.short_name, r.year, DATE_FORMAT(r.date, '%e-%b-%y') date
    FROM
        race r
    INNER JOIN grand_prix gp
        ON r.grand_prix_id = gp.id
    WHERE r.date > NOW()
    ORDER BY
        r.date ASC
    LIMIT 1;
`;

const getRacePointsByDriver = (year) => `
    SELECT 
        d.full_name, rr.points, rr.position_number, r.id as raceId, gp.short_name
    FROM 
        race_result rr
    INNER JOIN driver d 
        ON rr.driver_id = d.id
    INNER JOIN race r 
        ON rr.race_id = r.id
    INNER JOIN grand_prix gp 
        ON r.grand_prix_id = gp.id
    WHERE r.year = ${year}
        AND rr.points is not null
    GROUP BY 
        d.full_name, race_id, rr.points
    ORDER BY 
        raceId, position_number, d.full_name
`;

const getRaceDriverOfDay = () => `
    SELECT
        d.id,
        dotdr.position_number,
        d.permanent_number,
        -- d.full_name,
        d.name as full_name,
        dotdr.percentage
    FROM
        driver_of_the_day_result dotdr
    INNER JOIN
        driver d ON dotdr.driver_id = d.id
    INNER JOIN
        race_result rr ON dotdr.race_id = rr.race_id
    INNER JOIN
        (SELECT MAX(race_id) AS max_race_id FROM race_result) max_rr
        ON dotdr.race_id = max_rr.max_race_id
    GROUP BY
        d.id, dotdr.position_number, d.permanent_number, d.full_name, dotdr.percentage
    ORDER BY dotdr.percentage DESC
`;

const getRacePolePosition = (raceId) => `
    SELECT
        d.full_name,
        d.permanent_number
    FROM
        starting_grid_position sgp
    INNER JOIN driver d
        ON sgp.driver_id = d.id
    INNER JOIN race r
        ON sgp.race_id = r.id
    WHERE sgp.race_id = ${raceId}
        AND sgp.position_number = 1;
`;

const getRaceResultsWithQual = (raceId) => `
    SELECT
        d.full_name driver_full_name,
        d.permanent_number,
        d.country_of_birth_country_id,
        rr.position_number,
        rr.points,
        r.year,
        rr.time race_time,
        c.full_name circuit_name,
        gp.short_name,
        gp.full_name gp_full_name,
        gp.country_id,
        ctry.name country_name
    FROM
        race_result rr
    INNER JOIN driver d
        ON rr.driver_id = d.id
    INNER JOIN race r
        ON rr.race_id = r.id
    INNER JOIN circuit c
        ON r.circuit_id = c.id
    INNER JOIN grand_prix gp
        ON r.grand_prix_id = gp.id
    INNER JOIN country ctry
        ON gp.country_id = ctry.id
    WHERE r.id = ${raceId};
`;

const getRacesResultsWithQual = (year) => `
    SELECT
        d.id as driver_id,
        r.id as race_id,
        gp.short_name,
        r.year,
        r.date,
        d.full_name,
        rr.position_number,
        rr.points,
        gp.country_id,
        gp.full_name as official_name,
        c.place_name,
        d.nationality_country_id,
        gp.country_id as race_country,
        rr.time,
        r.laps,
        r.circuit_id,
        r.distance
    FROM
        race_result rr
    INNER JOIN
        race_data rd ON rr.race_id = rd.race_id
    INNER JOIN
        driver d ON rr.driver_id = d.id
    INNER JOIN
        race r ON rr.race_id = r.id
    INNER JOIN
        circuit c ON r.circuit_id = c.id
    INNER JOIN
        grand_prix gp ON r.grand_prix_id = gp.id
    WHERE
        r.year = ${year} and rr.position_number = 1
    GROUP BY 
        d.id, 
        r.id, 
        gp.short_name, 
        r.year, 
        r.date, 
        d.full_name, 
        rr.position_number, 
        rr.points,
        gp.country_id, 
        gp.full_name, 
        c.place_name, 
        d.nationality_country_id,
        rr.time 
    ORDER BY 
        r.id DESC,
        CASE
            WHEN rr.position_number REGEXP '^[0-9]+$' THEN CAST(rr.position_number AS UNSIGNED)
            ELSE 999999999
        END
`;

module.exports = {
    getRaceMaxYear,
    getRaceDriverOfDay,
    getRaceFastestLap,
    getRaceFastestPitstop,
    getRaceLastResults,
    getRaceNext,
    getRacePointsByDriver,
    getRacePolePosition,
    getRaceResultsWithQual,
    getRacesResultsWithQual,
};
