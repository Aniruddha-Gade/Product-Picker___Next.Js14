'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { useAllProductsQuery } from '../../redux/features/product/productApi';
import Link from "next/link"
import { IProduct } from "../../types/type"
import {LoadingProductSkeleton} from "../../utils/LoadingSkeleton"



const AllProductsPage = () => {
  const [products, setProducts] = useState();
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = useAllProductsQuery({})



  useEffect(() => {
    if (isSuccess) {
      toast.success("All Products fetched Successfully")
      // setProducts([...data.products, ...data.products])
      setProducts(data.products)
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
        <h1 className="text-2xl font-bold mb-6">All Products</h1>

        {
          isLoading ? (
            <div className="w-full grid  grid-cols-3 gap-4">
              <LoadingProductSkeleton />
              <LoadingProductSkeleton />
              <LoadingProductSkeleton />
            </div>
          ) : !isLoading && !products?.length ? (
            <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
              You havn't created any product...!
              </div>
          ) : (
            <ul className="w-full grid grid-cols-3 gap-4">
             { products.map((product: IProduct) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="p-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 rounded-xl hover:shadow-md"
              >
                <li className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{product?.title}</h2>
                    <p>{product?.description}</p>
                    <p className="font-bold">Price: ${product?.price}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    {/* Uncomment and update the following code when `product.status` is properly defined */}
                    {/* <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              product?.status === 'pending'
                ? 'bg-yellow-200 text-yellow-800'
                : product.status === 'approved'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}>
              {product?.status}
            </span> */}
                  </div>
                </li>
              </Link>
              ))
            }
            </ul>
          )
        }
      </div>
    </SidebarLayout>
  );
};

export default AllProductsPage;