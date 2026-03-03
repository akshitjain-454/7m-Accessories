export function Hero() {
  return (
    <section className="relative w-full h-[700px] bg-black flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615469506649-ce126ecbd59a?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-6 tracking-widest uppercase">
          7M Auto Care Products
        </h2>
        
        <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-8 drop-shadow-lg">
          <span className="font-black">7M ACCESSORIES</span> Is a leading brand in the premium automotive accessories industry. <br/>
          <span className="text-gray-300 font-normal">Discover new levels of performance and style.</span>
        </h1>
        
        <div className="text-7xl font-black text-white italic tracking-tighter mb-8 drop-shadow-2xl opacity-90">
          7M
        </div>
        
        <button className="bg-brand text-white px-12 py-4 text-lg font-bold rounded-sm shadow-[0_4px_14px_0_rgba(31,31,105,0.39)] hover:shadow-[0_6px_20px_rgba(31,31,105,0.23)] hover:bg-blue-900 hover:-translate-y-1 transition-all duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
}