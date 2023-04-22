interface MainWeatherResponse {
    //common
    latitude: number
    longitude: number
    //daily
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_mean: number[]
    sunrise: string[]
    sunset: string[]
    uv_index_max: number[]
    windspeed_10m_max: number[]
    winddirection_10m_dominant: number[]
    //hourly
    relativehumidity_2m: number[]
}

export default MainWeatherResponse