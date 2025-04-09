// const { app } = require('@azure/functions');

// app.http('db_test', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         context.log(`Http function processed request for url "${request.url}"`);

//         const name = request.query.get('name') || await request.text() || 'world';

//         return { body: `Hello, ${name}!` };
//     }
// });

const { app } = require('@azure/functions');

const { apiRun } = require('../connectionUtils.js');
const { getDriverOfDay } = require('../queryObjects/driverQueries.js');

app.http(
    'b',
    apiRun(getDriverOfDay)
);
