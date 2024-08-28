import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/auth/registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REGISTRATION API RESULT => ", result)
                    dispatch(userRegistration({ token: result.data.activationToken }));
                } catch (error: any) {
                    console.log("REGISTRATION API ERROR => ", error)
                }
            },
        }),

        // activate account with OTP and Token
        activation: builder.mutation({
            query: (data) => ({
                url: "/auth/activate-user",
                method: "POST",
                body: data,
                // credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("ACTIVATION USER ACCOUNT API RESULT => ", result)
                } catch (error: any) {
                    console.log("ACTIVATION USER ACCOUNT API ERROR => ", error)
                }
            },
        }),
    }),
});


export const { useRegisterMutation, useActivationMutation } = authApi