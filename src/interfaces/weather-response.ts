interface MainWeatherResponse {
    //common
    latitude: number
    longitude: number
    //daily
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_mean: number[]
    //hourly
    relativehumidity_2m: number[]
}

export default MainWeatherResponse