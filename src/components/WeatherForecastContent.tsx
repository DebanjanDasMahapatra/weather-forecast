import { Card, Col, Container, Row } from 'react-bootstrap'
import AirQualityResponse from "../interfaces/air-quality-response"
import MainWeatherResponse from "../interfaces/weather-response"
import Constants from "../utils/constants"

const WeatherForecastContent = ({ weatherData, airQualityData }: { weatherData: MainWeatherResponse | undefined, airQualityData: AirQualityResponse | undefined }) => {
    return <>
        <Container fluid="md">
            <Row>
                {weatherData && airQualityData && weatherData.time.map((time: string, index: number) => <Col key={time} md="3">
                    {index == 0 && <h3 className="text-center">Today</h3>}
                    {index == 1 && <h3 className="text-center">14-Day Forecast</h3>}
                    <Card className="bg-dark mb-3">
                        <Card.Body>
                            <Card.Title className="text-secondary" style={{ fontSize: '18px' }}>{new Intl.DateTimeFormat("en-US", Constants.dateFormatOptions).format(new Date(time))}</Card.Title>
                            <Card.Text className="text-info fw-bold" style={{ fontSize: '30px' }}>
                                {weatherData.temperature_2m_max[index]} &deg;C / {weatherData.temperature_2m_min[index]} &deg;C
                            </Card.Text>
                            <Card.Text>
                                Maximum Humidity: {weatherData.relativehumidity_2m[index]}%
                            </Card.Text>
                            {weatherData.precipitation_probability_mean[index] != null && <Card.Text>
                                Chances of Rain: {weatherData.precipitation_probability_mean[index]}%
                            </Card.Text>}
                            <Card.Text className="text-warning fw-bold">
                                UV Index: {weatherData.uv_index_max[index]}<br />
                                {airQualityData.us_aqi[index] != 0 && <span>AQI: {airQualityData.us_aqi[index]}</span>}
                            </Card.Text>
                            <Card.Text>
                                Sunrise: {new Intl.DateTimeFormat("en-US", Constants.timeFormatOptions).format(new Date(weatherData.sunrise[index]))}<br />
                                Sunset: {new Intl.DateTimeFormat("en-US", Constants.timeFormatOptions).format(new Date(weatherData.sunset[index]))}
                            </Card.Text>
                            <Card.Text className="text-success fw-bold">
                                Wind: {weatherData.windspeed_10m_max[index]} km/h {Constants.getWindDirectionFromDegrees(weatherData.winddirection_10m_dominant[index])}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>)}
            </Row>
        </Container>
    </>
}

export default WeatherForecastContent