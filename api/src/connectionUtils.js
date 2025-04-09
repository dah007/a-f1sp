require('dotenv').config();
const mysql = require('mysql2');

/**
 * @constant {number} YEAR - The current year.
 */
const YEAR = new Date().getFullYear();

const conn = mysql.createConnection({
    host: 'f1sp.mysql.database.azure.com', //process.env.DB_HOST,
    user: 'dholmberg', // process.env.DB_USER,
    password: 'f1spf1rankAZU!', // process.env.DB_PASSWORD,
    database: 'f1sp', // process.env.DB_NAME,
    port: 3306, // process.env.DB_PORT,
    ssl: {
        ca: `-----BEGIN CERTIFICATE-----
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=
-----END CERTIFICATE-----` //process.env.DB_SSL_CA,
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
