import { apiSlice } from "../api/apiSlice";



export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get-pending-reviews
        pendingRequests: builder.query({
            query: () => ({
                url: "/review/get-pending-reviews",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET PENDING REQUESTS API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET PENDING REQUESTS API ERROR => ", error)
                }
            }
        }),



    }),
});


export const {  usePendingRequestsQuery } = reviewApi