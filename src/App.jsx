import { Header } from "./components/Header";
import { Hero3D } from "./components/Hero3D";
import { Locations } from "./components/Locations";
import { Footerdemo } from "./components/ui/footer-section";

// This is your restored TopBar
const TopBar = () => (
  <div className="bg-[#f8f9fa] border-b border-gray-200 py-2 px-6 text-xs sm:text-sm font-medium">
    <div className="container mx-auto flex justify-center items-center">
      <div className="tracking-wide text-center font-bold text-[#1F1F69]">
        We Don't accept returns!
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="bg-white text-gray-900 antialiased font-sans flex flex-col min-h-screen">
      {/* 1. Top Bar always comes first */}
      <TopBar />
      
      {/* 2. Header stays sticky below Top Bar */}
      <Header />
      
      <main className="flex-grow">
        {/* 3. The 3D Interactive Hero */}
        <Hero3D />
        <Locations />
      </main>
      
      <Footerdemo />
    </div>
  );
}

export default App;