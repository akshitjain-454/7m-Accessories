"use client";

import NavBar from "./ui/navbar";
import { Search } from "lucide-react";
import logo7M from '../assets/7m-logo.png'; 

const menus = [
  { id: 1, title: 'Home', url: '/', dropdown: false },
  { id: 2, title: 'About Us', url: '/about', dropdown: false },
  { id: 3, title: 'Contact Us', url: '/contact', dropdown: false },
  { id: 4, title: 'Social Media', url: '/social', dropdown: false },
  {
    id: 5,
    title: 'Products',
    url: '/products',
    dropdown: true,
    items: [
      { id: 51, title: 'Premium Exhausts', url: '/products/exhausts' },
      { id: 52, title: 'Mobile holders', url: '/products/helmets' },
      { id: 53, title: 'LED HeadLights', url: '/products/lighting' },
      { id: 54, title: 'Spray paints', url: '/products/wheels' },
    ],
  },
];

export function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      
      {/* SOLID BRAND ACCENT STRIPE */}
      <div className="w-full h-[3px] bg-[#1F1F69]"></div>

      <div className="py-3 pl-8 pr-8 w-full max-w-[1400px] mx-auto flex justify-between items-center relative">
        
        {/* LOGO SECTION - Restored Original Spacing */}
        <div className="flex items-center cursor-pointer group gap-2 z-10">
          <img 
            src={logo7M} 
            alt="7M Accessories" 
            className="h-12 w-12 rounded-full object-cover border border-slate-200 shadow-inner group-hover:scale-105 transition-transform"
          />
          <div className="text-sm md:text-base font-black tracking-widest text-[#1F1F69] uppercase mt-1 whitespace-nowrap">
           7M ACCESSORIES
          </div>
        </div>

        {/* NAVBAR SECTION - Restored Perfect Center (left-1/2) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-max z-10">
            <NavBar list={menus} />
        </div>

        {/* SEARCH PILL - Restored Original Scaling */}
        <div className="z-10">
          <button className="flex items-center gap-2 bg-[#1F1F69] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 group shadow-lg shadow-[#1F1F69]/20">
            <Search className="w-4 h-4" /> 
            <span className="font-black text-sm tracking-wide uppercase">Search</span>
          </button>
        </div>
        
      </div>
    </header>
  );
}

export default Header;