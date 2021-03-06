import { ZoneGeoItems } from "./ZoneGeoItems";
import { CRUD } from "./CRUD";


export const NavBarItems = [
  {
    id: 1,
    title: "HOME",
    path: '/',
    cName: "NavItems",
  },
  {
    id: 2,
    title: "DESTINATIONS",
    path: '/destinations',
    cName: "NavItems",
    dropdown: ZoneGeoItems  
  },
  {
    id: 3,
    title: "CONSEILS",
    path: '/conseils',
    cName: "NavItems",
  },
  {
    id: 4,
    title: "CONTACT",
    path: '/contact',
    cName: "NavItems",
  },
  {
    id: 5,
    title: "BONSPLANS",
    path: '/bonsplans',
    cName: "NavItems",
  },
  
  {
    id: 6,
    title: "DASHBOARD",
    path: '/admin/dashboard',
    cName: "NavItems",
    dropdown: CRUD
  },
  
]





