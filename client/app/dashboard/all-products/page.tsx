'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { useAllProductsQuery } from '../../redux/features/product/productApi';
import Link from "next/link"
import Image from "next/image"
import { IProduct } from "../../types/type"
import { LoadingProductSkeleton } from "../../utils/LoadingSkeleton"
import { formatDate } from '../../../lib/formatDate'

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"



const AllProductsWithPaginationPage = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [allProductsCount, setAllProductsCount] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  const { data, isSuccess, error, isLoading } = useAllProductsQuery({ page: currentPage, limit: 10 });


  useEffect(() => {
    if (isSuccess) {
      toast.success("All Products fetched Successfully");
      setProducts(data.products);
      setAllProductsCount(data.allProductsCount);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data, products]);

  // console.log("Updated products state:", products);  

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <SidebarLayout userRole={user?.accountType}>
      <div className='min-h-screen flex-col w-full text-black dark:text-white p-5'>
        <h1 className="text-2xl font-bold mb-6">All Products : {allProductsCount} </h1>

        {isLoading ? (
          <div className="w-full grid grid-cols-3 gap-4">
            <LoadingProductSkeleton />
            <LoadingProductSkeleton />
            <LoadingProductSkeleton />
            <LoadingProductSkeleton />
            <LoadingProductSkeleton />
            <LoadingProductSkeleton />
          </div>
        ) : !isLoading && !products ? (
          <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
            You haven't created any product...!
          </div>
        ) : (
          <>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {products && products?.map((product: IProduct) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className=" p-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 rounded-xl hover:shadow-md"
                >
                  <div className='w-full h-60 flex-center '>
                    <Image
                      src={product?.image ? product?.image : '/assets/images/not-available.jpg'}
                      width={230}
                      height={230}
                      className='w-full h-full object-cover rounded-xl '
                      alt={`${product?.title}`}
                    />
                  </div>

                  <li className="flex flex-col gap-3 justify-between mt-5">
                    <div className='flex flex-col gap-2'>
                      <h2 className="text-xl font-semibold">{product?.title}</h2>
                      <p>{product?.description}</p>
                      <p className="font-bold">Price: ₹{product?.price}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date: <span className="font-medium text-gray-800 dark:text-gray-200">
                          {product?.createdAt ? formatDate(product?.createdAt) : 'Date not available'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product?.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : product.status === 'approved'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                        }`}>
                        {product?.status}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>

            {/* Pagination */}
            <Pagination className='mt-10'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  // disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(data?.totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? 'bg-green-600 ' : ''}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  // disabled={currentPage === data?.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </>
        )}
      </div>
    </SidebarLayout>
  );
};

export default AllProductsWithPaginationPage;