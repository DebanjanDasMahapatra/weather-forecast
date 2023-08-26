import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import AirQualityResponse from "../interfaces/air-quality-response"
import MainWeatherResponse from "../interfaces/weather-response"
import Constants from "../utils/constants"

const WeatherForecastContent = ({ weatherData, airQualityData }: { weatherData: MainWeatherResponse | undefined, airQualityData: AirQualityResponse | undefined }) => {
    return <>
        <Container fluid="md">
            <Row>
                {weatherData && airQualityData && weatherData.time.map((time: string, index: number) => <Col key={time} md="3">
                    <Card className="bg-dark mb-3">
                        <Card.Body>
                            <div className="text-center">
                                <Card.Title className="text-secondary" style={{ fontSize: '18px' }}>{new Intl.DateTimeFormat("en-US", Constants.dateFormatOptions).format(new Date(time))}&nbsp;&nbsp;&nbsp;&nbsp;{index == 0 && <Badge bg="primary">TODAY</Badge>}</Card.Title>
                                <Card.Text className="text-info fw-bold mb-3" style={{ fontSize: '30px' }}>
                                    {weatherData.temperature_2m_max[index]} &deg;C / {weatherData.temperature_2m_min[index]} &deg;C
                                </Card.Text>
                            </div>
                            <Row style={{paddingLeft: 20, paddingRight: 20}}>
                                <Col>
                                    <Card.Text>
                                        <img className="icons" src={require('../assets/humidity.png')} />&nbsp;&nbsp; {weatherData.relativehumidity_2m[index]}%
                                    </Card.Text>
                                </Col>
                                <Col>
                                    {weatherData.precipitation_probability_mean[index] != null && <Card.Text className="text-right">
                                        <img className="icons" src={require('../assets/rain.png')} />&nbsp;&nbsp; {weatherData.precipitation_probability_mean[index]}%
                                    </Card.Text>}
                                </Col>
                            </Row>
                            <br />
                            <Row style={{paddingLeft: 20, paddingRight: 20}}>
                                <Col>
                                    <Card.Text className="text-warning fw-bold">
                                        <img className="icons" src={require('../assets/uv-index.png')} />&nbsp;&nbsp; {weatherData.uv_index_max[index]}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text className="text-warning text-right fw-bold">
                                        {airQualityData.us_aqi[index] != 0 && <span><img className="icons" src={require('../assets/air-purifier.png')} />&nbsp;&nbsp; {airQualityData.us_aqi[index]}</span>}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <br />
                            <Row style={{paddingLeft: 20, paddingRight: 20}}>
                                <Col>
                                    <Card.Text>
                                        <img className="icons" src={require('../assets/sunrise.png')} />&nbsp;&nbsp; {new Intl.DateTimeFormat("en-US", Constants.timeFormatOptions).format(new Date(weatherData.sunrise[index]))}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text className="text-right">
                                        <img className="icons" src={require('../assets/sunset.png')} />&nbsp;&nbsp; {new Intl.DateTimeFormat("en-US", Constants.timeFormatOptions).format(new Date(weatherData.sunset[index]))}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <br />
                            <Card.Text className="text-success text-center fw-bold">
                                <img className="icons" src={require('../assets/storm.png')} />&nbsp;&nbsp; {weatherData.windspeed_10m_max[index]} km/h {Constants.getWindDirectionFromDegrees(weatherData.winddirection_10m_dominant[index])}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>)}
            </Row>
        </Container>
    </>
}

export default WeatherForecastContent