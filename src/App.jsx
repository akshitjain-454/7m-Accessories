import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Facebook, Instagram } from "lucide-react";

// TopBar component kept inside App.tsx for simplicity
const TopBar = () => (
  <div className="bg-[#f8f9fa] text-gray-600 border-b border-gray-200 py-2 px-6 text-xs sm:text-sm font-medium">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex gap-4">
        <a href="#" className="hover:text-brand transition-colors"><Facebook size={18} /></a>
        <a href="#" className="hover:text-brand transition-colors"><Instagram size={18} /></a>
      </div>
      <div className="tracking-wide text-center flex-grow">
        Worldwide Shipping for Premium Bike & Car Accessories
      </div>
      <div className="w-[50px]"></div> {/* Spacer */}
    </div>
  </div>
);

function App() {
  return (
    <div className="bg-white text-gray-900 antialiased font-sans flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <Hero />
    </div>
  );
}

export default App;