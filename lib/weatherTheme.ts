/**
 * Derives a visual theme from an OpenWeatherMap weather condition ID.
 * OWM ID ranges: https://openweathermap.org/weather-conditions
 */
export interface WeatherTheme {
  /** CSS gradient for the hero background */
  gradient: string;
  /** Particle colours for Particles.jsx */
  particleColors: string[];
  /** Particle speed multiplier */
  particleSpeed: number;
  /** Particle count */
  particleCount: number;
  /** Whether to use alpha (soft) particles */
  alphaParticles: boolean;
}

export function getWeatherTheme(conditionId: number, isDaytime: boolean): WeatherTheme {
  // Thunderstorm
  if (conditionId >= 200 && conditionId < 300) {
    return {
      gradient: isDaytime
        ? 'linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e293b 100%)'
        : 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #09090b 100%)',
      particleColors: ['#a78bfa', '#818cf8', '#c4b5fd'],
      particleSpeed: 2.5,
      particleCount: 180,
      alphaParticles: true,
    };
  }
  // Drizzle / Rain
  if (conditionId >= 300 && conditionId < 600) {
    return {
      gradient: isDaytime
        ? 'linear-gradient(160deg, #1e3a5f 0%, #2d5986 50%, #3a7bd5 100%)'
        : 'linear-gradient(160deg, #090d16 0%, #16243b 50%, #1e3a5f 100%)',
      particleColors: ['#93c5fd', '#60a5fa', '#bfdbfe'],
      particleSpeed: 1.8,
      particleCount: 200,
      alphaParticles: true,
    };
  }
  // Snow
  if (conditionId >= 600 && conditionId < 700) {
    return {
      gradient: isDaytime
        ? 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 50%, #dde1e7 100%)'
        : 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      particleColors: ['#ffffff', '#e0f2fe', '#bae6fd'],
      particleSpeed: 0.6,
      particleCount: 220,
      alphaParticles: true,
    };
  }
  // Atmosphere (fog, mist, haze, etc.)
  if (conditionId >= 700 && conditionId < 800) {
    return {
      gradient: isDaytime
        ? 'linear-gradient(160deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)'
        : 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      particleColors: ['#cbd5e1', '#94a3b8', '#e2e8f0'],
      particleSpeed: 0.4,
      particleCount: 100,
      alphaParticles: true,
    };
  }
  // Clear sky
  if (conditionId === 800) {
    if (isDaytime) {
      return {
        gradient: 'linear-gradient(160deg, #0284c7 0%, #38bdf8 50%, #7dd3fc 100%)',
        particleColors: ['#ffffff', '#e0f2fe', '#bae6fd'],
        particleSpeed: 0.5,
        particleCount: 100,
        alphaParticles: false,
      };
    }
    // Clear night
    return {
      gradient: 'linear-gradient(160deg, #070d1e 0%, #0f172a 50%, #1e293b 100%)',
      particleColors: ['#ffffff', '#e2e8f0', '#94a3b8'],
      particleSpeed: 0.3,
      particleCount: 160,
      alphaParticles: true,
    };
  }
  // Few clouds (801: 11-25% coverage - predominantly sunny/clear)
  if (conditionId === 801) {
    if (isDaytime) {
      return {
        gradient: 'linear-gradient(160deg, #0284c7 0%, #38bdf8 45%, #bae6fd 100%)',
        particleColors: ['#ffffff', '#f0f9ff', '#e0f2fe'],
        particleSpeed: 0.5,
        particleCount: 80,
        alphaParticles: false,
      };
    }
    // Night
    return {
      gradient: 'linear-gradient(160deg, #0b1120 0%, #111e38 50%, #1e293b 100%)',
      particleColors: ['#e2e8f0', '#94a3b8'],
      particleSpeed: 0.4,
      particleCount: 120,
      alphaParticles: true,
    };
  }
  // Scattered clouds (802: 25-50% coverage - partly cloudy)
  if (conditionId === 802) {
    if (isDaytime) {
      return {
        gradient: 'linear-gradient(160deg, #0369a1 0%, #0ea5e9 40%, #94a3b8 100%)',
        particleColors: ['#ffffff', '#e2e8f0', '#cbd5e1'],
        particleSpeed: 0.6,
        particleCount: 110,
        alphaParticles: true,
      };
    }
    // Night
    return {
      gradient: 'linear-gradient(160deg, #0b1120 0%, #1e293b 50%, #334155 100%)',
      particleColors: ['#cbd5e1', '#94a3b8'],
      particleSpeed: 0.5,
      particleCount: 130,
      alphaParticles: true,
    };
  }
  // Broken clouds (803) & Overcast clouds (804)
  if (conditionId >= 803 && conditionId < 900) {
    if (isDaytime) {
      return {
        gradient: 'linear-gradient(160deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
        particleColors: ['#cbd5e1', '#94a3b8', '#e2e8f0'],
        particleSpeed: 0.7,
        particleCount: 140,
        alphaParticles: true,
      };
    }
    // Night
    return {
      gradient: 'linear-gradient(160deg, #0a0f1d 0%, #182234 50%, #253347 100%)',
      particleColors: ['#94a3b8', '#64748b'],
      particleSpeed: 0.5,
      particleCount: 120,
      alphaParticles: true,
    };
  }
  // Default fallback
  return {
    gradient: 'linear-gradient(160deg, #1e293b 0%, #334155 50%, #475569 100%)',
    particleColors: ['#ffffff', '#94a3b8'],
    particleSpeed: 0.8,
    particleCount: 140,
    alphaParticles: true,
  };
}
