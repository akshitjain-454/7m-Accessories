"use client"

import * as React from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Facebook, Instagram, Send, Moon, Sun } from "lucide-react"
import { Switch } from "./switch"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  return (
    <footer className="relative border-t bg-[#1F1F69] text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="relative">
            {/* Increased title size and made it pure white */}
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white">
              7M Accessories
            </h2>
            {/* Brightened the description text */}
            <p className="mb-6 text-lg text-blue-50 leading-relaxed">
              Your premier destination for high-end automotive and bike enhancements.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Join the newsletter"
                className="h-12 pr-12 bg-white/15 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white text-base"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 rounded-full bg-white text-[#1F1F69] hover:bg-blue-50 transition-transform hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <div>
            {/* Increased heading size and brightened color */}
            <h3 className="mb-6 text-xl font-bold uppercase tracking-widest text-blue-300">
              Quick Links
            </h3>
            <nav className="space-y-4 text-base md:text-lg">
              <a href="/" className="block transition-colors hover:text-white hover:translate-x-1 duration-200">Home</a>
              <a href="/about" className="block transition-colors hover:text-white hover:translate-x-1 duration-200">About Us</a>
              <a href="/products" className="block transition-colors hover:text-white hover:translate-x-1 duration-200">Products</a>
              <a href="/contact" className="block transition-colors hover:text-white hover:translate-x-1 duration-200">Contact Us</a>
            </nav>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="mb-6 text-xl font-bold uppercase tracking-widest text-blue-300">
              Our Products
            </h3>
            <nav className="space-y-4 text-base md:text-lg">
              <p className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 duration-200">Premium Exhausts</p>
              <p className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 duration-200">LED Lighting</p>
              <p className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 duration-200">Mobile Holders</p>
              <p className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 duration-200">Safety Gear</p>
            </nav>
          </div>

          {/* Social & Theme Section */}
          <div className="relative">
            <h3 className="mb-6 text-xl font-bold uppercase tracking-widest text-blue-300">
              Connect With Us
            </h3>
            <div className="mb-8 flex space-x-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#1F1F69] transition-all">
                      <Facebook className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p className="text-sm font-bold">Facebook</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#1F1F69] transition-all">
                      <Instagram className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p className="text-sm font-bold">Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center space-x-3 text-blue-200">
              <Sun className="h-5 w-5" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-tighter ml-2">Display Theme</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-10 text-center md:flex-row">
          <p className="text-base text-blue-100/70 font-medium">
            © 2026 <span className="text-white font-bold">7M Accessories</span>. All rights reserved.
          </p>
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest text-blue-200">
            <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }