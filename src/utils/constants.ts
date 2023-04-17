const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "long"
}

const WMOWeatherCodeInterpretationCodes = (code: number): string => {
    switch (code) {
        case 0: return 'Clear Sky'
        case 1: return 'Mainly Clear'
        case 2: return 'Partly Cloudy'
        case 3: return 'Overcast'
        case 45: return 'Fog'
        case 48: return 'Depositing Rime Fog'
        case 51: return 'Light Drizzle'
        case 53: return 'Moderate Drizzle'
        case 55: return 'Dense Drizzle'
        case 56: return 'Light Freezing Drizzle'
        case 57: return 'Dense Freezing Drizzle'
        case 61: return 'Slight Rain'
        case 63: return 'Moderate Rain'
        case 65: return 'Heavy Rain'
        case 66: return 'Light Freezing Rain'
        case 67: return 'Heavy Freezing Rain'
        case 71: return 'Slight Snow Fall'
        case 73: return 'Moderate Snow Fall'
        case 75: return 'Heavy Snow Fall'
        case 77: return 'Snow Grains'
        case 80: return 'Slight Rain Showers'
        case 81: return 'Moderate Rain Showers'
        case 82: return 'Violent Rain Showers'
        case 85: return 'Slight Snow Showers'
        case 86: return 'Heavy Snow showers'
        case 95: return 'Slight or Moderate Thunderstorm'
        case 96: return 'Thunderstorm with Slight Hail'
        case 99: return 'Thunderstorm with Heavy Hail'
        default: return ''
    }
}

const Constants = {
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    WeatherURL: 'https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LNG&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&forecast_days=15&hourly=relativehumidity_2m&timezone=auto',
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    GeoLocationURL: 'https://nominatim.openstreetmap.org/reverse?format=geojson&lat=LAT&lon=LNG',
    //Replace SEARCH with Search String of Location while calling the API
    GeoCodingURL: 'https://geocoding-api.open-meteo.com/v1/search?name=SEARCH&count=10&language=en&format=json',
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    AirQualityURL: 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=LAT&longitude=LNG&hourly=us_aqi&timezone=auto',
    dateFormatOptions,
    WMOWeatherCodeInterpretationCodes
}

export default Constants