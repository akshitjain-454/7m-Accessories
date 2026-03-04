import { Header } from "./components/Header";
import { Hero3D } from "./components/Hero3D"; // <--- Import the new component
import { Locations } from "./components/Locations";
import { Footerdemo } from "./components/ui/footer-section";

function App() {
  return (
    <div className="bg-white text-gray-900 antialiased font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero3D /> {/* <--- Use it here */}
        <Locations />
      </main>
      <Footerdemo />
    </div>
  );
}
export default App;