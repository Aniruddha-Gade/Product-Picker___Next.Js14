import { apiSlice } from "../api/apiSlice";



export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        allProducts: builder.query({
            query: () => ({
                url: "/product/get-products",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET ALL PRODUCTS API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET ALL PRODUCTS API ERROR => ", error)
                }
            }
        }),


    }),
});


export const { useAllProductsQuery, } = productApi