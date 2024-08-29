'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import SidebarLayout from '../../../../components/sidebar/SidebarLayout'
import AdminProtected from '../../../../hooks/adminProtected'
import { toast } from 'sonner';
import { useGetSingleReviewQuery } from '../../../../redux/features/review/reviewApi';
import { LoadingRequestSkeleton } from "../../../../utils/LoadingSkeleton"
import { ACCOUNT_TYPE } from '../../../../constants/account-types'
// import { IProduct } from "../../../../types/type"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table"




const page = ({ params: { request_id }, }) => {
    const [request, setRequest] = useState<IProduct>();
    const { user } = useSelector((state: any) => state.auth)
    const { data: singleReviewData, isSuccess: singleReviewIsSuccess, error: singleReviewError, isLoading: singleReviewIsLoading } = useGetSingleReviewQuery({ request_id })


    const status = 'approv'

    useEffect(() => {
        if (singleReviewIsSuccess) {
            toast.success(`Review data fetched Successfully`)
            setRequest(singleReviewData.review)
        }
        if (singleReviewError) {
            if ("data" in singleReviewError) {
                const errorData = singleReviewError as any
                toast.error(errorData.data.message)
            }
        }
    }, [singleReviewIsSuccess, singleReviewError])




    return (
        <SidebarLayout userRole={user?.accountType}>
            <AdminProtected>
                <div className="min-h-screen flex-col w-full text-black dark:text-white p-5">

                    <h1 className="text-2xl font-bold mb-6">Review Details</h1>
                    <h1 className="text-xl font-semibold mb-6">Review ID : {request_id}</h1>


                    {
                        singleReviewIsLoading ? (<div className="w-full grid grid-cols-1 gap-4">
                            <LoadingRequestSkeleton />
                        </div>
                        ) : !singleReviewIsLoading && request?.length === 0 ? (
                            <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
                                There are no pending Requests...!
                            </div>
                        ) : (
                            <div
                                className="block p-5 bg-black/10 dark:bg-white/10 shadow-md hover:shadow-lg rounded-xl transition-shadow duration-300"
                            >
                                <Table>
                                    <TableCaption>A list of your recent Requests.</TableCaption>

                                    {/* product keys */}
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Product Title</TableHead>
                                            <TableHead>Product Description</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead>Submitted By</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    {/* product data*/}
                                    <TableBody>
                                        <TableRow key={request?._id}>
                                            <TableCell className="font-medium">{request?.productId?.title}</TableCell>
                                            <TableCell className="font-medium">{request?.productId?.description}</TableCell>
                                            <TableCell>{request?.productId?.price}</TableCell>
                                            <TableCell>
                                                <p>{request?.submittedBy?.name}</p>
                                                <p>{request?.submittedBy?.email}</p>

                                            </TableCell>
                                            <TableCell>
                                                <p className={`text-md p-1 text-center rounded-full font-medium ${request?.status === 'pending' ?
                                                    'bg-yellow-200 text-black' : request?.status === 'approved' ?
                                                        'bg-green-200 text-white' : 'bg-red-200 text-red-black'}`}
                                                >
                                                    {request?.status}
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                    {/* Changes requested by  */}
                                    <TableHeader>
                                        <TableRow className='w-full text-center'>
                                            <TableHead className="text-lg w-full text-center text-green-700">
                                                <p className="text-green-700">
                                                    Changes requested by : {request?.submittedBy?.name}
                                                </p>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Changes requested keys  */}
                                    <TableBody>
                                        <TableRow >
                                            {Object.keys(request?.updatedFields ?? []).map((key) => (
                                                <TableCell key={key} className="font-medium">
                                                    {key}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>

                                    {/* Changes requested Data  */}
                                    <TableHeader>
                                        <TableRow >
                                            {Object.values(request?.updatedFields ?? []).map((value) => (
                                                <TableCell key={value} className="font-medium">
                                                    {value}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHeader>



                                    {/* 3rd header */}
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Reviewed by</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        <TableRow key={request?._id}>
                                            <TableCell>
                                                <p>{request?.reviewedBy?.name || "Not reviewed yet"} </p>
                                                <p>{request?.reviewedBy?.email || ""}</p>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                    <TableFooter>
                                        <TableRow>

                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            </div>
                        )
                    }
                </div>

            </AdminProtected>
        </SidebarLayout>
    )
}

export default page