const getSeasonStats = () => `
    SELECT 	s.year,
            CONCAT(d.first_name, ' ', d.last_name) driverChampion,
            d.nationality_country_id driverNationality,
            d.id driverChampionId,
            sds.points driverChampionPoints,
            c.name constructorChampion,
            c.id constructorId,
            c.country_id constructorCountry,
            em.name constructorEngine,
            scs.points constructorPoints,
            (SELECT COUNT(*) FROM race r WHERE r.year = s.year) raceCount,
            (SELECT COUNT(DISTINCT sds.driver_id) FROM season_driver_standing sds WHERE sds.year = s.year) driverCount,
            (SELECT COUNT(DISTINCT scs.constructor_id) FROM season_constructor_standing scs WHERE scs.year = s.year) constructorCount,
            (SELECT SUM(laps) FROM race r WHERE r.year = s.year) totalLaps
    FROM	season s
    INNER JOIN season_constructor_standing scs 
            ON s.year = scs.year
    INNER JOIN constructor c 
            ON scs.constructor_id = c.id 
    INNER JOIN engine_manufacturer em 
            ON scs.engine_manufacturer_id = em.id 
    INNER JOIN season_driver_standing sds 
            ON s.year = sds.year 
    INNER JOIN driver d 
            ON sds.driver_id = d.id 
    WHERE	scs.position_number = 1
            AND sds.position_number = 1
    ORDER BY scs.year DESC 
`;

const getLatestSeasonYear = () => `
    SELECT MAX(year) year FROM season
`;

const getStandingWithConstructor = (year) => `
    SELECT 
        c.id constructor_id, em.name emName, c.name cName, scs.year, scs.position_number, scs.points, '' fill, '' color
    FROM 
        season_constructor_standing scs 
    INNER JOIN constructor c 
        ON scs.constructor_id = c.id 
    INNER JOIN engine_manufacturer em 
        ON scs.engine_manufacturer_id = em.id
    WHERE scs.year = ${year}
`;

const getStandingWithDriver = (year) => `
    SELECT
        d.name, sds.* 
    FROM 
        season_driver_standing sds 
    INNER JOIN 
        driver d ON sds.driver_id = d.id 
    WHERE sds.year = ${year}
`;

const getTotalWinsBySeason = (year) => `
    SELECT 
        count(d.id) total, d.full_name name, d.id
    FROM race_result rr
    INNER JOIN constructor c ON 
        rr.constructor_id = c.id
    INNER JOIN driver d ON rr.driver_id = d.id
    INNER JOIN race r ON rr.race_id = r.id
    WHERE r.year = ${year}
        AND rr.position_number = 1
    GROUP BY d.id
    ORDER BY total desc`;

module.exports = {
    getLatestSeasonYear,
    getSeasonStats,
    getStandingWithConstructor,
    getStandingWithDriver,
    getTotalWinsBySeason,
};
