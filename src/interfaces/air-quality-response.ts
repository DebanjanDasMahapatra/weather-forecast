interface AirQualityResponse {
    //common
    latitude: number
    longitude: number
    //hourly
    time: string[]
    us_aqi: number[]
}

export default AirQualityResponse