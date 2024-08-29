'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { toast } from 'sonner';
import { useGetSingleProductQuery } from '../../redux/features/product/productApi';
import ProductForm from "../../utils/ProductForm"



const page = ({ params: { product_id }, }) => {
  const [product, setProduct] = useState({})
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = useGetSingleProductQuery({ product_id })



  useEffect(() => {
    if (isSuccess) {
      toast.success("Product details fetched Successfully")
      setProduct(data.product)
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])


  return (
    <SidebarLayout userRole={user?.accountType}>
      <div className='min-h-screen flex-col w-full text-black dark:text-white p-5'>
      <h1 className="text-2xl font-bold mb-6">Product Review</h1>

        <ProductForm type='Review' product={product} productId={product._id} />
  
      </div>


    </SidebarLayout>
  )
}

export default page