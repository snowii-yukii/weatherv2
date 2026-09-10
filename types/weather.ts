export interface WeatherData {
    name: string;

    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
    };

    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];

    wind: {
        speed: number;
    };

    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface ForecastData {
    list: {
    dt: number;

    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };

    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];

    wind: {
      speed: number;
    };

    dt_txt: string;
}[];

  city: {
    name: string;
    country: string;
  };
}

export interface WeatherResponse {
  weather: WeatherData;
  forecast: ForecastData;
}