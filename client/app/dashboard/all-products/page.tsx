'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { useAllProductsQuery } from '../../redux/features/product/productApi';
import Link from "next/link"

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = useAllProductsQuery({})



  useEffect(() => {
    if (isSuccess) {
      toast.success("All Products fetched Successfully")
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


        <ul className="w-full grid grid-rows-4 grid-flow-col gap-4">
          {products.map(product => (
            <Link
              href={`/product/${product._id}`}
              className="p-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 rounded-xl hover:shadow-md"
            >
              <li key={product._id} >
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="font-bold">Price: ${product.price}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </SidebarLayout>
  );
};

export default AllProductsPage;
