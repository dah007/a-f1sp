// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { F1SP_BASE_DB_URL } from '../constants/constants';
// import { buildErrorObject } from '@/utils';

// export const systemApi = createApi({
//     reducerPath: 'systemApi',
//     baseQuery: fetchBaseQuery({ baseUrl: F1SP_BASE_DB_URL }),
//     endpoints: (builder) => ({
//         login: builder.query({
//             queryFn: async ({ name, pin }) => {
//                 try {
//                     return fetch(
//                         '/login', 
//                         { method: 'POST', body: JSON.stringify({ name, pin }) }
//                     ).then((res) => res.json());
//                 } catch (error) {
//                     return buildErrorObject(error);
//                 }
                
//             },
//         }),
//     }),
// });

// export const { useLoginQuery } = systemApi;
