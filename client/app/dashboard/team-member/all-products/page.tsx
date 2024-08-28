'use client'

import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import SidebarLayout from '../../../components/sidebar/SidebarLayout'
import { ACCOUNT_TYPE } from '../../../constants/account-types'



const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const {user}=useSelector((state:any)=>state.auth)

  useEffect(() => {
    // Fetch the products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    // fetchProducts();
  }, []);

  return (
    <SidebarLayout userRole={user?.accountType}>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ul className="space-y-4">
        {/* {products.map(product => (
          <li key={product._id} className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold">Price: ${product.price}</p>
          </li>
        ))} */}
      </ul>
    </SidebarLayout>
  );
};

export default AllProductsPage;
