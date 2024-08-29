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


        // get-pending-reviews
        getSingleReview: builder.query({
            query: ({request_id:reviewId}) => ({
                url: `/review/get-single-review/${reviewId}`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET SINGLE REVIEW (ADMIN) API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET SINGLE REVIEW (ADMIN) API ERROR => ", error)
                }
            }
        }),


        // Review Submission
        reviewSubmission: builder.mutation({
            query: ({reviewId, status}) => ({
                url: `/review/review-submission/${reviewId}`,
                method: "PUT",
                body:{status},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REVIEW SUBMISSION (ADMIN) API RESULT => ", result)
                } catch (error: any) {
                    console.log("REVIEW SUBMISSION (ADMIN) API ERROR => ", error)
                }
            }
        }),



    }),
});


export const {  usePendingRequestsQuery , useSubmitReviewMutation, useGetSingleReviewQuery, useReviewSubmissionMutation } = reviewApi