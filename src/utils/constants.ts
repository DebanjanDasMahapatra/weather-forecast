const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "long"
}

const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
}

const getWindDirectionFromDegrees = (degrees: number): string => {
    switch (true) {
        case (degrees > 348.75 || degrees <= 11.25): return 'North'
        case (degrees > 11.25 && degrees <= 33.75): return 'North of North East'
        case (degrees > 33.75 && degrees <= 56.25): return 'North East'
        case (degrees > 56.25 && degrees <= 78.75): return 'East of North East'
        case (degrees > 78.75 && degrees <= 101.25): return 'East'
        case (degrees > 101.25 && degrees <= 123.75): return 'East of South East'
        case (degrees > 123.75 && degrees <= 146.25): return 'South East'
        case (degrees > 146.25 && degrees <= 168.75): return 'South of South East'
        case (degrees > 168.75 && degrees <= 191.25): return 'South'
        case (degrees > 191.25 && degrees <= 213.75): return 'South of South West'
        case (degrees > 213.75 && degrees <= 236.25): return 'South West'
        case (degrees > 236.25 && degrees <= 258.75): return 'West of South West'
        case (degrees > 258.75 && degrees <= 281.25): return 'West'
        case (degrees > 281.25 && degrees <= 303.75): return 'West of North West'
        case (degrees > 303.75 && degrees <= 326.25): return 'North West'
        case (degrees > 326.25 && degrees <= 348.75): return 'North of North West'
        default: return ''
    }
}

const Constants = {
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    WeatherURL: 'https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LNG&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant&forecast_days=15&hourly=relativehumidity_2m&timezone=auto',
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    GeoLocationURL: 'https://nominatim.openstreetmap.org/reverse?format=geojson&lat=LAT&lon=LNG',
    //Replace SEARCH with Search String of Location while calling the API
    GeoCodingURL: 'https://geocoding-api.open-meteo.com/v1/search?name=SEARCH&count=10&language=en&format=json',
    //Replace LAT, LNG with Latitude, Longitude respectively of Location while calling the API
    AirQualityURL: 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=LAT&longitude=LNG&hourly=us_aqi&timezone=auto',
    dateFormatOptions,
    timeFormatOptions,
    getWindDirectionFromDegrees
}

export default Constants