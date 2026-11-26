'use client'

import React, { useState } from "react"
import { CloudSun, Search, X } from "lucide-react"
import SearchBar from "@/components/SearchBar"

interface NavbarProps {
    onSearch: (city: string) => void
    onReset?: () => void
}

export default function Navbar({ onSearch, onReset }: NavbarProps) {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen((prev) => !prev)
    }

    const handleSearchSubmit = (city: string) => {
        onSearch(city)
        // Optionally close mobile search on submit
        setIsMobileSearchOpen(false)
    }

    return (
        <header className="sm:top-5 z-40 w-full max-w-5xl mx-auto px-2 sm:px-0">
            <nav 
                aria-label="Main Navigation"
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_3px_rgb(0,0,0,0.04)] px-4 py-3 sm:px-6 sm:py-3.5 transition-all duration-200"
            >
                {/* Main Navbar Header Row */}
                <div className="flex items-center justify-between gap-4">
                    {/* Brand / Logo */}
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer group text-left"
                        aria-label="WeatherPulse Home"
                    >
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
                            <CloudSun className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:opacity-90 transition-opacity">
                            Weather<span className="text-sky-500">Pulse</span>
                        </span>
                    </button>

                    {/* Desktop Search Bar (visible on sm: and up) */}
                    <div className="hidden sm:flex flex-1 max-w-md ml-auto">
                        <SearchBar onSearch={onSearch} />
                    </div>

                    {/* Mobile Collapse Toggle Button (visible only below sm:) */}
                    <div className="flex sm:hidden items-center">
                        <button
                            type="button"
                            onClick={toggleMobileSearch}
                            aria-expanded={isMobileSearchOpen}
                            aria-label={isMobileSearchOpen ? "Close search bar" : "Open search bar"}
                            className={`p-2 rounded-xl border transition-all duration-200 ${
                                isMobileSearchOpen 
                                    ? "bg-slate-100 border-slate-200 text-slate-900" 
                                    : "bg-slate-50 border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                        >
                            {isMobileSearchOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Collapsible Search Bar (collapses at sm: size) */}
                <div 
                    className={`grid sm:hidden transition-all duration-300 ease-in-out ${
                        isMobileSearchOpen 
                            ? "grid-rows-[1fr] opacity-100 pt-3 mt-3 border-t border-slate-100" 
                            : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0 pt-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <SearchBar 
                            onSearch={handleSearchSubmit} 
                            autoFocus={isMobileSearchOpen}
                        />
                    </div>
                </div>
            </nav>
        </header>
    )
}
