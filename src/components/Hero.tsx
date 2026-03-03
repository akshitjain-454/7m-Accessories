import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Array of slides with Unsplash images and dynamic text
const slides = [
  {
    img: "https://images.unsplash.com/photo-1615469506649-ce126ecbd59a?q=80&w=2070&auto=format&fit=crop",
    h2: "7M Auto Care Products",
    h1_bold: "7M ACCESSORIES",
    h1_text: "Is a leading brand in the premium automotive accessories industry.",
    h1_sub: "Discover new levels of performance and style."
  },
  {
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop", // Sports Car
    h2: "Luxury Auto Upgrades",
    h1_bold: "PREMIUM SELECTION",
    h1_text: "Elevate your driving experience with top-tier gear.",
    h1_sub: "Uncompromising quality and aesthetics."
  },
  {
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop", // Motorcycle
    h2: "Advanced Bike Gear",
    h1_bold: "RIDE WITH STYLE",
    h1_text: "The ultimate accessories for true enthusiasts.",
    h1_sub: "Durability meets cutting-edge design."
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-play functionality (Changes slide every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Slide navigation functions
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    // Added 'group' class to show arrows only on hover
    <section className="relative w-full h-[700px] bg-black flex items-center justify-center overflow-hidden group">
      
      {/* Background Images Mapping */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <div 
            className={`absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-[6000ms] ${
              i === current ? "scale-105" : "scale-100"
            }`}
            style={{ backgroundImage: `url('${slide.img}')` }}
          />
        </div>
      ))}
      
      {/* Dark Gradient Overlay (Kept exactly as you had it) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10 pointer-events-none"></div>

      {/* Content Container (Kept exactly as you had it, mapped to state) */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-6 tracking-widest uppercase transition-all duration-500">
          {slides[current].h2}
        </h2>
        
        <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-8 drop-shadow-lg transition-all duration-500">
          <span className="font-black">{slides[current].h1_bold}</span> {slides[current].h1_text} <br/>
          <span className="text-gray-300 font-normal">{slides[current].h1_sub}</span>
        </h1>
        
        <div className="text-7xl font-black text-white italic tracking-tighter mb-8 drop-shadow-2xl opacity-90">
          7M
        </div>
        
        <button className="bg-brand text-white px-12 py-4 text-lg font-bold rounded-sm shadow-[0_4px_14px_0_rgba(31,31,105,0.39)] hover:shadow-[0_6px_20px_rgba(31,31,105,0.23)] hover:bg-blue-900 hover:-translate-y-1 transition-all duration-300">
          Shop Now
        </button>
      </div>

      {/* Navigation Controls (Left & Right Arrows) */}
      <button 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-30 opacity-0 group-hover:opacity-100 duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>
      <button 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-30 opacity-0 group-hover:opacity-100 duration-300"
        onClick={nextSlide}
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/70 font-mono tracking-widest text-sm font-bold z-30">
        0{current + 1} <span className="text-white/30">/</span> 0{slides.length}
      </div>
    </section>
  );
}