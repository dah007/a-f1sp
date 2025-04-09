/**
 * Generate a SQL query to get constructors that participated in races during or after a specified year.
 * 
 * @param {number} year - The year from which to start querying constructors.
 * @returns {string} A SQL query that joins constructor data with country information and race data, 
 *                   filtered by the specified year and race result type.
 *                   Results are grouped by constructor ID and ordered by constructor name.
 */
const getConstructors = (year) => (`
	SELECT 	c.*, c2.alpha2_code, c2.name
	FROM 	constructor c
	INNER JOIN country c2 
		ON c.country_id = c2.id
	INNER JOIN race_data rd 
		ON c.id = rd.constructor_id
	INNER JOIN race r
		ON rd.race_id = r.id
	WHERE r.year >= ${year}
		AND rd.type = 'RACE_RESULT'
	GROUP BY c.id
	ORDER BY c.name;
`);

module.exports = { getConstructors };
