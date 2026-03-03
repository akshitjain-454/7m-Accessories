import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Replaced abstract images with premium automotive/bike Unsplash images
const slides = [
  {
    img: "https://images.unsplash.com/photo-1615469506649-ce126ecbd59a?q=80&w=2070&auto=format&fit=crop",
    subtitle: "7M Auto Care Products",
    title: "7M ACCESSORIES",
    desc: "Is a leading brand in the premium automotive accessories industry.",
    subDesc: "Discover new levels of performance and style."
  },
  {
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Premium Bike Accessories",
    title: "ELEVATE YOUR RIDE",
    desc: "High-performance gear engineered for the open road.",
    subDesc: "Uncompromising quality for true enthusiasts."
  },
  {
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Luxury Car Enhancements",
    title: "PRECISION & STYLE",
    desc: "Upgrade your vehicle with our exclusive collections.",
    subDesc: "Where aesthetics meet aerodynamics."
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  // Optional: Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[700px] bg-black flex items-center justify-center overflow-hidden group">
      
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ${
              i === current ? "scale-105" : "scale-100"
            }`}
            style={{ backgroundImage: `url('${slide.img}')` }}
          />
          {/* Dark Gradient Overlay (Kept exactly from your Hero) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>
      ))}

      {/* Content Container (Kept exactly from your Hero) */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-6 tracking-widest uppercase transition-all duration-500">
          {slides[current].subtitle}
        </h2>
        
        <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-8 drop-shadow-lg transition-all duration-500">
          <span className="font-black">{slides[current].title}</span> {slides[current].desc} <br/>
          <span className="text-gray-300 font-normal">{slides[current].subDesc}</span>
        </h1>
        
        <div className="text-7xl font-black text-white italic tracking-tighter mb-8 drop-shadow-2xl opacity-90">
          7M
        </div>
        
        <button className="bg-[#1F1F69] text-white px-12 py-4 text-lg font-bold rounded-sm shadow-[0_4px_14px_0_rgba(31,31,105,0.39)] hover:shadow-[0_6px_20px_rgba(31,31,105,0.23)] hover:bg-blue-900 hover:-translate-y-1 transition-all duration-300">
          Shop Now
        </button>
      </div>

      {/* Controls (Hidden by default, shown on group hover for cleaner UX) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 right-8 z-20 text-white/70 font-mono tracking-widest text-sm font-bold">
        0{current + 1} <span className="text-white/30">/</span> 0{slides.length}
      </div>

    </section>
  );
}