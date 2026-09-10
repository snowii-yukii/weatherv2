import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get('city')
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!city && (!lat || !lon)) {
        return NextResponse.json(
            { error: "City or coordinates (lat, lon) are required" },
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

    const url = city
        ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response = await fetch(url);

    if (!response.ok) {
    return NextResponse.json(
        { error: "City not found" },
        { status: response.status }
    );
    }

    const weatherData = await response.json();

    let forecastUrl = "";

    if (city) {
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
    )}&appid=${API_KEY}&units=metric`;
    } else if (lat && lon) {
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
    return NextResponse.json(
        { error: "Failed to fetch forecast" },
        { status: forecastResponse.status }
    );
    }

    const forecastData = await forecastResponse.json();

    return NextResponse.json({
    weather: weatherData,
    forecast: forecastData,
    });
}