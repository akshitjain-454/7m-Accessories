import NavBar from "./ui/navbar";
import { Search } from "lucide-react";

// Adjust this path if your logo is in a different location relative to this file
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
    <header className="bg-white py-2 pl-8 pr-6 lg:pl-16 lg:pr-10 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center relative">
        
        {/* LOGO SECTION */}
        <div className="flex items-center cursor-pointer group gap-1.5 z-10">
          <img 
            src={logo7M} 
            alt="7M Accessories Brand Logo" 
            className="h-14 w-14 rounded-full object-cover border border-slate-200 shadow-inner group-hover:scale-105 transition-transform"
          />
          <div className="text-sm md:text-base font-bold tracking-widest text-[#1F1F69] uppercase mt-1 whitespace-nowrap">
           ACCESSORIES
          </div>
        </div>

        {/* NAVBAR SECTION */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-max z-10">
            <NavBar list={menus} />
        </div>

        {/* SEARCH SECTION */}
        <div className="flex items-center justify-end gap-2 cursor-pointer text-[#1F1F69] hover:text-blue-800 transition-colors group z-10">
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
          <span className="font-bold text-sm tracking-wider uppercase whitespace-nowrap">Search</span>
        </div>
        
      </div>
    </header>
  );
}