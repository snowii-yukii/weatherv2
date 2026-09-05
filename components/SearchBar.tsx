'use client'

import React, { useState } from "react"

interface SearchBarProps {
    onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [city, setCity] = useState<string>('')

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedCity = city.trim()

        if(!trimmedCity) return;

        onSearch(trimmedCity)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Search..." />
        
            <button type="submit">Search</button>
        </form>
    )
}