import NavBar from "./ui/navbar";
import { Search } from "lucide-react";

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
    <header className="bg-white py-5 px-6 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex flex-col items-start cursor-pointer group">
          <div className="text-5xl font-black text-brand leading-none tracking-tighter italic group-hover:scale-105 transition-transform">
            7M
          </div>
          <div className="text-xs font-bold tracking-widest text-gray-800 uppercase mt-1">
           ACCESSORIES
          </div>
        </div>

        {/* Framer Motion Navbar */}
        <div className="hidden lg:block">
            <NavBar list={menus} />
        </div>

        {/* Right Action (Search Only) */}
        <div className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-brand transition-colors group">
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
          <span className="font-bold text-sm tracking-wider uppercase">Search</span>
        </div>
        
      </div>
    </header>
  );
}