import React from 'react'
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"


const UserDropdownMenu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none border-none '>
         <div className='w-8 h-8 '>
         <Image
            src='/assets/images/aniruddha-profile.jpg'
            width={30}
            height={30}
            className='w-full h-full rounded-full object-cover'
            alt="Profile Icon"
          />
         </div>
        </DropdownMenuTrigger>


        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default UserDropdownMenu