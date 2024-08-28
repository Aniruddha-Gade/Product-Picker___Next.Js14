'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { useAllProductsQuery } from '../../redux/features/product/productApi';


const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state: any) => state.auth)
  // const { products } = useSelector((state: any) => state.product)
  const { data, isSuccess, error, isLoading } = useAllProductsQuery({})

  console.log("products from all-products = ", data)




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


        <ul className="space-y-4">
          {products.map(product => (
          <li key={product._id} className="p-4 bg-black/20 dark:bg-white/10 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold">Price: ${product.price}</p>
          </li>
        ))}
        </ul>
      </div>
    </SidebarLayout>
  );
};

export default AllProductsPage;
