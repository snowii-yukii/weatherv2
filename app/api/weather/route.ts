import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!city && (!lat || !lon)) {
        return NextResponse.json(
            { error: "City or coordinates (lat, lon) are required" },
            { status: 400 }
        );
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
        return NextResponse.json(
            { error: 'API KEY is missing' },
            { status: 400 }
        );
    }

    const trimmedCity = city ? city.trim() : null;

    const url = trimmedCity
        ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        return NextResponse.json(
            { error: "City not found" },
            { status: response.status }
        );
    }

    const weatherData = await response.json();

    let forecastUrl = "";

    if (trimmedCity) {
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`;
    } else if (lat && lon) {
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const forecastResponse = await fetch(forecastUrl, { cache: 'no-store' });

    if (!forecastResponse.ok) {
        return NextResponse.json(
            { error: "Failed to fetch forecast" },
            { status: forecastResponse.status }
        );
    }

    const forecastData = await forecastResponse.json();

    return NextResponse.json(
        {
            weather: weatherData,
            forecast: forecastData,
        },
        {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
        }
    );
}