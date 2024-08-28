
import { ACCOUNT_TYPE } from './account-types';



export interface SidebarLink {
  id: number;
  name: string;
  path: string;
  icon: string;
  roles: ACCOUNT_TYPE[];
}


export const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/profile",
    icon: "VscAccount",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 2,
    name: "All Products",
    path: "/dashboard/all-products",
    icon: "VscDashboard",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 4,
    name: "My Submissions",
    path: "/dashboard/team-member/my-submissions",
    icon: "VscVm",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER],
  },


  {
    id: 5,
    name: "Pending Requests",
    path: "/dashboard/admin/pending-requests",
    icon: "VscBook",
    roles: [ACCOUNT_TYPE.ADMIN],
  },
 
];
