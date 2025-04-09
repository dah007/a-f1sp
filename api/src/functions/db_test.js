const { app } = require('@azure/functions');

const { apiRun } = require('../connectionUtils.js');
const { getDriverOfDay } = require('../queryObjects/driverQueries.js');

app.http(
    'db_test',
    apiRun(getDriverOfDay)
);
