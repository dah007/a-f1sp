require('dotenv').config();
const mysql = require('mysql2');

/**
 * @constant {number} YEAR - The current year.
 */
const YEAR = new Date().getFullYear();

const conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    ssl: {
        ca: process.env.DATABASE_SSL_CA,
    }
});

/**
 * @function getQueryVar
 * @description Retrieves a specific query variable from the request query parameters or route parameters.
 * @param {Object} request - The request object.
 * @param {string} [varName='year'] - The name of the variable to retrieve.
 * @returns {string} The value of the query variable.
 *
 * @todo: Update, remove the default value for varName
 */
const getQueryVar = (request, varName = 'year') => {
    // Check query parameters
    if (request.query && request.query[varName]) {
        return mysql.escape(request.query[varName]);
    }

    // Check route parameters
    if (request.params && request.params[varName]) {
        return mysql.escape(request.params[varName]);
    }

    // Check headers
    if (request.headers && request.headers[varName]) {
        return mysql.escape(request.headers[varName]);
    }

    // last ditch, if it was year, just use the current year
    if (varName === 'year') {
        return YEAR; //mysql.escape(request[varName]);
    }

    return '';
};

/**
 * @function rawSQLrun
 * @description Executes a raw SQL query and returns a Promise with the result.
 * @param {string} sql - The SQL query to execute.
 * @returns {Promise} A promise that resolves with the query results.
 */
const rawSQLrun = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(results);
        });
    });
};

const apiRun = (queryFunc, whereKey = 'year') => {
    return {
        methods: ['GET', 'POST'],
        authLevel: 'anonymous',
        handler: async (request, context) => {
            try {
                const results = await rawSQLrun(queryFunc(getQueryVar(request, whereKey)));

                if (!results) {
                    context.res = {
                        status: 404,
                        body: 'No results found.',
                    };
                    return;
                }

                if (!Array.isArray(results)) {
                    context.res = {
                        status: 500,
                        body: 'Invalid response format.',
                    };
                    return;
                }

                return context.res = {
                    status: 200,
                    body: JSON.stringify(results),
                };
            } catch (error) {
                // Handle errors and send an appropriate response
                context.log('Error:', error);
                return context.res = {
                    status: 500,
                    body: 'An error occurred while processing the request.',
                };
            }
        }
    };
};

module.exports = {
    apiRun,
    YEAR,
    conn,
    // getQueryVar,
    // rawSQLrun,
};
