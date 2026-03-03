"use client"

import * as React from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Switch } from "./switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Facebook, Instagram, Twitter, Send, Moon, Sun } from "lucide-react"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  return (
    // Background set to your brand color #1F1F69
    <footer className="relative border-t bg-[#1F1F69] text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">7M Accessories</h2>
            <p className="mb-6 text-blue-100/80">
              Your premier destination for high-end automotive and bike enhancements.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Join the newsletter"
                className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white text-[#1F1F69] hover:bg-gray-200 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block transition-colors hover:text-blue-300">Home</a>
              <a href="/about" className="block transition-colors hover:text-blue-300">About Us</a>
              <a href="/products" className="block transition-colors hover:text-blue-300">Products</a>
              <a href="/contact" className="block transition-colors hover:text-blue-300">Contact Us</a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Products</h3>
            <nav className="space-y-2 text-sm">
              <p className="cursor-pointer hover:text-blue-300">Premium Exhausts</p>
              <p className="cursor-pointer hover:text-blue-300">LED Lighting</p>
              <p className="cursor-pointer hover:text-blue-300">Mobile Holders</p>
              <p className="cursor-pointer hover:text-blue-300">Safety Gear</p>
            </nav>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Connect</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-white/5 hover:bg-white/20">
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Facebook</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-white/5 hover:bg-white/20">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* Dark Mode Toggle kept for UI consistency */}
            <div className="flex items-center space-x-2 opacity-50">
              <Sun className="h-4 w-4" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-blue-100/50 italic">
            © 2026 7M Accessories. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-blue-100/50 font-bold uppercase tracking-tighter">
            <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
