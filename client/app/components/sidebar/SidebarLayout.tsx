
import { ReactNode,useState } from 'react'
import {useSelector} from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ACCOUNT_TYPE } from './../../constants/account-types'
import { sidebarLinks, SidebarLink } from './../../constants/sidebar'
import Header from '../Header'
import Heading from '../../utils/Heading'
import Protected from "../../hooks/useProtectedRoute"


interface LayoutProps {
  children: ReactNode;
  userRole: string; 
}

const Layout = ({ children, userRole }: LayoutProps) => {
  const router = useRouter()
  const {user}=useSelector((state:any)=>state.auth)
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  const filteredLinks = sidebarLinks.filter((link: SidebarLink) => link.roles.includes(userRole))
  console.log("filteredLinks =", filteredLinks)


  
  return (
    <Protected className="">
      

      <main className="flex-1 p-6">
      <Heading
          title={`${user?.name} profile`}
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
      
      </main>

      <div className="flex">
      <aside className="w-64 bg-gray-800">
        <ul>
          {filteredLinks.map((link: SidebarLink) => (
            <li key={link.id} className={router.pathname === link.path ? 'bg-gray-900' : 'bg-red-600'}>
              <Link href={link.path}>
                <p className="flex items-center p-4 text-white">
                  <span className="icon">{link.icon}</span>
                  <span className="ml-4">{link.name}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

{children}
    </div>

    </Protected>
  );
};

export default Layout;
