# Weather V2

A simple weather app. Search for a city and see its current weather.

## Features

- Search weather by city name
- Shows temperature, conditions, humidity, and wind speed
- Validates the city name with a regex before searching

## Getting Started

1. Clone the repository

   git clone https://github.com/snowii-yukii/weatherv2.git
   cd weatherv2

2. Install dependencies

   npm install

3. Add your weather API key to a `.env` file

   API_KEY=your_api_key_here

4. Start the app

   npm start

## Usage

1. Type a city name into the search box.
2. Press Search.
3. View the current weather for that city.

## Input Validation

City names are checked with this regex before a request is sent:

    /^[A-Za-z\u00C0-\u024F]+([ '\-][A-Za-z\u00C0-\u024F]+)*$/

It accepts names like `Manila`, `New York`, and `Saint-Denis`, and rejects numbers and symbols.

## License

MIT
