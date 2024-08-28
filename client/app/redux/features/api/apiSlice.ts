import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userRegistration } from '../auth/authSlice';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "auth/refresh-token",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REFRESH TOKEN API RESULT => ", result)
                    dispatch(userRegistration({ token: result.data.accessToken }));
                } catch (error: any) {
                    console.log("REFRESH TOKEN API ERROR => ", error)
                }
            },
        }),


        loadUser: builder.query({
            query: (data) => ({
                url: "/auth/userinfo",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const result = await queryFulfilled;
                    const currentToken = getState().auth.token;
                    console.log("USER INFO API RESULT => ", result)
                    dispatch(
                        userLoggedIn({
                            accessToken: currentToken,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    console.log("USER INFO API ERROR => ", error)
                }
            },
        }),

    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;