import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footerdemo } from "./components/ui/footer-section"; // Import the footer

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
      <TopBar />
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footerdemo /> {/* Footer added here */}
    </div>
  );
}

export default App;