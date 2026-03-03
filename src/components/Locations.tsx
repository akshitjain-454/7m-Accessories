import { MapPin, ExternalLink } from "lucide-react";

export function Locations() {
  // Replace these coordinates with your actual store coordinates
  const lat = "13.064098715166585";
  const lng = "80.26889964228629";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.870624022838!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#1F1F69] uppercase tracking-tighter italic mb-4">
            Visit Our Store
          </h2>
          <p className="text-gray-600 text-lg">Click the map below to get directions on Google Maps.</p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50 group">
          {/* Actual Google Map Embed */}
          <iframe
            src={embedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          ></iframe>

          {/* Overlay Button - Redirects to Google Maps App/Web */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
             <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto bg-[#1F1F69] text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
            >
              <MapPin size={20} />
              Open in Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}