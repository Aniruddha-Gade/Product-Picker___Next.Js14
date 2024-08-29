'use client'


import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Protected from "../hooks/useProtectedRoute"
import SidebarLayout from '../components/sidebar/SidebarLayout'



const page = () => {

  const { user } = useSelector((state: any) => state.auth)


  return (
    <div>

        <SidebarLayout userRole={user?.accountType}>
          <div className='min-h-screen flex-center flex-col w-full text-black dark:text-white'>
            <h3 className='text-center text-5xl font-semibold'>
              This is a Dashboard Page
            </h3>


          </div>
        </SidebarLayout>
  
    </div>
  )
}

export default page