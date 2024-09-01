'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import SidebarLayout from '../../../../components/sidebar/SidebarLayout'
import AdminProtected from '../../../../hooks/adminProtected'
import { toast } from 'sonner';
import { useGetSingleReviewQuery, useReviewSubmissionMutation } from '../../../../redux/features/review/reviewApi';
import { LoadingRequestSkeleton } from "../../../../utils/LoadingSkeleton"
import { ACCOUNT_TYPE } from '../../../../constants/account-types'
import { IRequest } from "../../../../types/type"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "../../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../components/ui/select"

interface PageParams {
    request_id: string;
  }
  


  const page: React.FC<{ params: PageParams }> = ({ params: { request_id } }) => {
    const [request, setRequest] = useState<IRequest | null>(null);
    const [reviewStatus, setReviewStatus] = useState<string | undefined>();
    const { user } = useSelector((state: any) => state.auth)
    const { data: singleReviewData, isSuccess: singleReviewIsSuccess, error: singleReviewError, isLoading: singleReviewIsLoading } = useGetSingleReviewQuery({ request_id })
    const [reviewSubmission, { data: reviewSubmissionData, isSuccess: reviewSubmissionIsSuccess, error: reviewSubmissionError, isLoading: reviewSubmissionIsLoading }] = useReviewSubmissionMutation({})




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


    useEffect(() => {
        if (request) {
            setReviewStatus(request?.status);
        }
    }, [request]);

    const handleStatusChange = async (val:string) => {
        setReviewStatus(val)
        await reviewSubmission({ reviewId: request_id, status: val });
    }
    console.log("reviewStatus = ", reviewStatus)




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
                        ) : !singleReviewIsLoading && !request ? (
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
                                            <TableHead className='break-words max-w-[50px] '>Product Title</TableHead>
                                            <TableHead className='min-w-[100px] '>Product Image</TableHead>
                                            <TableHead>Product Description</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Submitted By</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    {/* product data*/}
                                    <TableBody>
                                        <TableRow key={request?._id}>
                                            <TableCell className="font-medium break-words max-w-[50px] ">{request?.productId?.title}</TableCell>
                                            <TableCell className='min-w-[100px] '>
                                            <div className='w-full h-60 flex-center '>
                    <Image
                      src={request?.productId?.image ? request?.productId?.image : '/assets/images/not-available.jpg'}
                      width={230}
                      height={230}
                      className='w-full h-full object-cover rounded-xl '
                      alt={`${request?.productId?.title}`}
                    />
                  </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{request?.productId?.description}</TableCell>
                                            <TableCell>{request?.productId?.price}</TableCell>
                                            <TableCell>
                                                <p>{request?.submittedBy?.name}</p>
                                                <p>{request?.submittedBy?.email}</p>

                                            </TableCell>
                                            <TableCell>
                                                <p className={`capitalize text-md p-2 text-center rounded-full font-medium ${request?.status === 'pending' ?
                                                    'bg-yellow-200 text-black' : request?.status === 'approved' ?
                                                        'bg-green-400 text-white' : 'bg-red-400 text-black'}`}
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
                                            <TableCell className='flex flex-row gap-4 items-center'>
                                                <p>Change Status</p>
                                                <Select value={reviewStatus} onValueChange={handleStatusChange}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="approved">Approved</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>



                                            </TableCell>
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