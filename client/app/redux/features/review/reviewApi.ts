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


        // Submit Review
        submitReview: builder.mutation({
            query: ({productId, updatedFields}) => ({
                url: `/review/submit-review/${productId}`,
                method: "POST",
                body:{updatedFields},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("SUBMIT REVIEW (TEAM-MEMBER) API RESULT => ", result)
                } catch (error: any) {
                    console.log("SUBMIT REVIEW (TEAM-MEMBER) API ERROR => ", error)
                }
            }
        }),



    }),
});


export const {  usePendingRequestsQuery ,useSubmitReviewMutation } = reviewApi