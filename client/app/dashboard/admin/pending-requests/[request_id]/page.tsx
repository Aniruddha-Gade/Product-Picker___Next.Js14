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
                    <h1 className="text-xl font-semibold mb-6">Review ID {request_id}</h1>


                    {
                        singleReviewIsLoading ? (<div className="w-full grid grid-cols-1 gap-4">
                            <LoadingRequestSkeleton />
                        </div>
                        ) : !singleReviewIsLoading && !request ? (
                            <div>No Request data found...!</div>
                        ) : (
                            <div
                                key={request._id}

                                className="block p-5  bg-black/10 dark:bg-white/10 shadow-md hover:shadow-lg rounded-xl transition-shadow duration-300"
                            >

<Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product Title</TableHead>
          <TableHead>Product Description</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Submitted By</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
          <TableRow key={request._id}>
            <TableCell className="font-medium">{request.productId.title}</TableCell>
            <TableCell className="font-medium">{request.productId.description}</TableCell>
            <TableCell>{request.productId.price}</TableCell>
            <TableCell>{request.submittedBy.name}</TableCell>
            <TableCell>{request.submittedBy.email}</TableCell>
            <TableCell className={`text-sm font-medium ${request.status === 'pending' ? 
                'bg-yellow-200 text-black' : request.status === 'approved' ?
                 'bg-green-200 text-white' : 'bg-red-200 text-red-black'}`}
                 >
                    {request.status}
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