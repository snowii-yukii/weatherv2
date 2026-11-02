'use client'

import React, { useState, useRef, useEffect } from "react"
import { Search, X, ArrowRight } from "lucide-react"

interface SearchBarProps {
    onSearch: (city: string) => void
    autoFocus?: boolean
    className?: string
    onSubmitted?: () => void
}

export default function SearchBar({ onSearch, autoFocus = false, className = "", onSubmitted }: SearchBarProps) {
    const [city, setCity] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [autoFocus])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedCity = city.trim()
        if (!trimmedCity) return

        onSearch(trimmedCity)
        if (onSubmitted) {
            onSubmitted()
        }
    }

    const handleClear = () => {
        setCity('')
        inputRef.current?.focus()
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className={`relative flex items-center w-full ${className}`}
        >
            <div className="relative flex items-center w-full">
                
                <input 
                    ref={inputRef}
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Search city or location..."
                    className="w-full pl-5 pr-20 py-2.5 bg-white/80 backdrop-blur-xl text-slate-800 placeholder:text-slate-400 text-sm font-medium rounded-xl border border-white/10 shadow-inner shadow-slate-900/5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/20 transition-all duration-200"
                />

                <div className="absolute right-2 flex items-center gap-1">
                    {city && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                            aria-label="Clear search"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={!city.trim()}
                        className="flex items-center justify-center p-1.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 disabled:hover:bg-sky-500 text-white rounded-lg shadow-sm transition-all duration-150 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                        aria-label="Search"
                    >
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </form>
    )
}