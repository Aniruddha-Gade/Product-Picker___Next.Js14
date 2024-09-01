'use client'

import { useState } from "react";
import Image from "next/image";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import AuthModal from "./components/auth/AuthModal";
import Verification from "./components/auth/Verification";

export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")


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


      <div>
        
      </div>




      {
        route === 'auth' && <>
          <AuthModal open={open} setOpen={setOpen} setRoute={setRoute} />
        </>
      }
       {
        route === 'verification' && <>
          <Verification open={open} setOpen={setOpen} setRoute={setRoute } />
        </>
      }

    </div>
  );
}
