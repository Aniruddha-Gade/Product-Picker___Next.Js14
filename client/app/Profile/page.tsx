'use client'


import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Protected from "../hooks/useProtectedRoute"

const page = () => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")
  const {user} = useSelector((state: any) => state.auth)


  
  return (
      <Protected>
    <div className="">

  
      <Heading
        title={`${user.name} profile`}
        description="Product Picker is platform for ..."
        keywords="sofa, table, tea table, "
      />

      {/* navbar */}
      <Header
        setOpen={setOpen}
        open={open}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />


      <div className='min-h-screen flex-center flex-col w-full text-black dark:text-white'>
        <h3 className='text-center text-5xl font-semibold'>
          This is a Profile Page
        </h3>

        <div className='mt-10 p-6 font-medium bg-black/5 dark:bg-white/10 rounded-xl text-black dark:text-white'>
          <p>User Name =  {user.name}</p>
          <p>User Email =  {user.email}</p>
          <p>Account Type =  {user.accountType}</p>
        
        </div>
      </div>





    </div>
    </Protected>
  )
}

export default page