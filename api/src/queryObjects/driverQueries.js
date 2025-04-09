const getDriver = (id) => `
    SELECT
        c.alpha2_code, UCASE(DATE_FORMAT(d.date_of_birth, '%d-%b-%Y')) formatted_dob, d.date_of_death, d.first_name, d.full_name, d.id, d.last_name, d.abbreviation, d.place_of_birth,
        d.country_of_birth_country_id
    FROM driver d
    INNER JOIN country c
        ON d.country_of_birth_country_id = c.id
    WHERE
        d.id = ${id}
    GROUP BY full_name
    ORDER BY d.abbreviation;
`;

const getDriverOfDay = () => `
    SELECT 
        dotdr.*, d.full_name name
    FROM 
        driver_of_the_day_result dotdr
    INNER JOIN driver d 
        ON dotdr.driver_id = d.id
    ORDER BY race_id desc, position_number
    LIMIT 5;
`;

const getDriverPreviousResults = (year) => `
    SELECT 
        r.year, d.full_name, d.id, rd.race_time, c.full_name circuitName
    FROM race r
    INNER JOIN race_data rd 
        ON r.id = rd.race_id AND rd.type = 'RACE_RESULT'
    INNER JOIN driver d 
        ON rd.driver_id = d.id
    INNER JOIN circuit c 
        ON r.circuit_id = c.id
    WHERE circuit_id = (SELECT circuit_id
            FROM race r2
            WHERE r2.year = ${year}
            AND r2.date > DATE_FORMAT(NOW(), '%Y-%m-%d')
            LIMIT 1)
    GROUP BY r.year
    ORDER BY r.year desc
    LIMIT 5;
`;

const getDriverPointsByRace = (year) => `
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
    WHERE 
        r.year = ${year}
    AND 
        rr.points is not null
    GROUP BY 
        d.full_name, race_id, rr.points
    ORDER BY 
        raceId, position_number, d.full_name;
`;

const getDriverPositionTotals = (id) => `
    SELECT 
        COUNT(rd.position_number) as count, rd.position_number
    FROM 
        race_data rd 
    WHERE 
        rd.type ='RACE_RESULT'
        AND rd.driver_id = ${id}
    GROUP BY rd.position_number, rd.position_text;
`;

const getDriverPodiums = (id) => `
    SELECT
        sum(case when position_number = 1 then 1 else 0 end) total1st,
        sum(case when position_number = 2 then 1 else 0 end) total2nd,
        sum(case when position_number = 3 then 1 else 0 end) total3rd
    FROM  race_result
    WHERE position_number <= 3
        AND driver_id = ${id};
`;

const getDriverStats = (driverId) => `
    SELECT 
        (SELECT COUNT(driver_id) FROM race_result WHERE driver_id = ${driverId}) totalRaces,
        (SELECT COUNT(driver_id) FROM season_entrant_driver WHERE driver_id = ${driverId}) totalSeasons,
        (SELECT COUNT(driver_id) FROM season_driver_standing WHERE driver_id = ${driverId} AND position_number = 1) totalChampionships;
`;

const getDriverWins = (driverId) => `
    SELECT
        r.id race_id,
        r.official_name,
        r.date,
        rd2.position_number starting_position,
        d.id,
        d.full_name
    FROM driver d
    INNER JOIN
        race_data rd ON d.id = rd.driver_id
            AND rd.type = 'RACE_RESULT'
            AND rd.position_number = 1
    INNER JOIN
        race_data rd2 ON rd.race_id = rd2.race_id
            AND rd2.driver_id = d.id
            AND rd2.type = 'STARTING_GRID_POSITION'
    INNER JOIN
        race r ON rd.race_id = r.id
    WHERE
        d.id = ${driverId}
    GROUP BY
        r.id,
        r.official_name,
        r.date,
        rd2.position_number,
        d.id,
        d.full_name
    ORDER BY r.id desc;
`;

const getDrivers = (year = new Date().getFullYear()) => `
SELECT distinct
        c.id constructor_id, d.*
    FROM driver d
    INNER JOIN race_data rd
        ON d.id = rd.driver_id AND d.total_race_entries > 0
    INNER JOIN constructor c
        ON rd.constructor_id = c.id
    INNER JOIN race r
        ON rd.race_id = r.id
    WHERE
        r.year = ${year}
    GROUP BY d.full_name, rd.race_id, d.id, d.name, d.first_name, d.last_name, d.abbreviation, 
        d.country_of_birth_country_id, 
        DATE_FORMAT(d.date_of_birth, '%d-%b-%Y'), d.date_of_death, d.place_of_birth,
        d.nationality_country_id, d.second_nationality_country_id, d.best_championship_position, 
        d.best_race_result, d.total_championship_wins, d.total_race_entries,
        d.total_podiums, d.total_race_wins, d.total_fastest_laps, d.total_pole_positions, d.total_points,
        c.id
    ORDER BY d.abbreviation;
`;

const getDriversByYear = (year) => `
    SELECT	d.id, d.name, d.abbreviation, d.permanent_number, sed.*
    FROM	season_entrant_driver sed
    INNER JOIN 
            driver d ON sed.driver_id = d.id
    WHERE 	sed.year = ${year}
`;

module.exports = {
    getDriver,
    getDriverOfDay,
    getDriverPodiums,
    getDriverPointsByRace,
    getDriverPositionTotals,
    getDriverPreviousResults,
    getDriverStats,
    getDriverWins,
    getDrivers,
    getDriversByYear,
};
