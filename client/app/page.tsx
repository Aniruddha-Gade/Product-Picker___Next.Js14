'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Image from "next/image";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import AuthModal from "./components/auth/AuthModal";
import Verification from "./components/auth/Verification";

export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  const { token,user } = useSelector((state: any) => state.auth)
  const router = useRouter()

  useEffect(()=>{
    if(!user || !token) {
      router.push("/")
      setOpen(true)
      setRoute("auth")
   }
  },[user, token])


  console.log("user from root page = ", user)
  console.log("token from root page = ", token)
  return (
    <div className="">
      <Heading
        title="Product Picker"
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


      <div className='flex flex-col mt-14 min-h-screen text-black dark:text-white p-5'>
        <h3 className='text-2xl font-semibold '>Furniture for you?</h3>

        <div className="bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold  mb-4">Product Picker 💪🏆</h1>

          <p className="">
            Product Picker is a full-stack application designed to manage products efficiently with robust features including:
          </p>

          <ul className="list-disc list-inside  mt-4">
            <li>Authentication && Authorization</li>
            <li>Role-based access</li>
            <li>Product management</li>
            <li>Review submissions</li>
            <li>And more...</li>
          </ul>

          <p className="mt-4">
            Built with the latest technologies such as
            <span className='font-bold text-green-600'> Next.js 14, TypeScript, Express.js, MongoDB and Redux</span>
            ,<br />
            it offers a seamless user experience for both team members and admins.
          </p>

        </div>

      </div>




      {
        route === 'auth' && <>
          <AuthModal open={open} setOpen={setOpen} setRoute={setRoute} />
        </>
      }
      {
        route === 'verification' && <>
          <Verification open={open} setOpen={setOpen} setRoute={setRoute} />
        </>
      }

    </div>
  );
}
