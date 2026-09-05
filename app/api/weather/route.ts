import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get('city')

    if(!city) {
        return NextResponse.json(
            { error: "City is required" },
            { status: 400 }
        )
    }

    const API_KEY = process.env.WEATHER_API_KEY

    if(!API_KEY) {
        return NextResponse.json(
            { error: 'API KEY is missing'},
            { status: 400 }
    )
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`
    )

    if(!response.ok) {
        return NextResponse.json(
            { error: 'City not found'},
            { status: response.status }
        )
    }

    const data = await response.json()

    return NextResponse.json(data)
}