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
      gradient: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      particleColors: ['#a78bfa', '#818cf8', '#c4b5fd'],
      particleSpeed: 2.5,
      particleCount: 180,
      alphaParticles: true,
    };
  }
  // Drizzle / Rain
  if (conditionId >= 300 && conditionId < 600) {
    return {
      gradient: 'linear-gradient(160deg, #1e3a5f 0%, #2d5986 50%, #3a7bd5 100%)',
      particleColors: ['#93c5fd', '#60a5fa', '#bfdbfe'],
      particleSpeed: 1.8,
      particleCount: 220,
      alphaParticles: true,
    };
  }
  // Snow
  if (conditionId >= 600 && conditionId < 700) {
    return {
      gradient: 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 50%, #dde1e7 100%)',
      particleColors: ['#ffffff', '#e0f2fe', '#bae6fd'],
      particleSpeed: 0.6,
      particleCount: 250,
      alphaParticles: true,
    };
  }
  // Atmosphere (fog, mist, haze, etc.)
  if (conditionId >= 700 && conditionId < 800) {
    return {
      gradient: 'linear-gradient(160deg, #94a3b8 0%, #64748b 50%, #475569 100%)',
      particleColors: ['#cbd5e1', '#94a3b8', '#e2e8f0'],
      particleSpeed: 0.4,
      particleCount: 120,
      alphaParticles: true,
    };
  }
  // Clear sky
  if (conditionId === 800) {
    if (isDaytime) {
      return {
        gradient: 'linear-gradient(160deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)',
        particleColors: ['#ffffff', '#e0f2fe', '#bae6fd'],
        particleSpeed: 0.5,
        particleCount: 120,
        alphaParticles: false,
      };
    }
    // Clear night
    return {
      gradient: 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #1e3a5f 100%)',
      particleColors: ['#ffffff', '#e2e8f0', '#94a3b8'],
      particleSpeed: 0.3,
      particleCount: 200,
      alphaParticles: true,
    };
  }
  // Clouds
  if (conditionId > 800 && conditionId < 900) {
    return {
      gradient: 'linear-gradient(160deg, #334155 0%, #475569 50%, #64748b 100%)',
      particleColors: ['#cbd5e1', '#94a3b8', '#e2e8f0'],
      particleSpeed: 0.7,
      particleCount: 150,
      alphaParticles: true,
    };
  }
  // Default fallback
  return {
    gradient: 'linear-gradient(160deg, #1e293b 0%, #334155 50%, #475569 100%)',
    particleColors: ['#ffffff', '#94a3b8'],
    particleSpeed: 0.8,
    particleCount: 150,
    alphaParticles: true,
  };
}
