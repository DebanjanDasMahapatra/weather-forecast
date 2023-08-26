import axios, { AxiosResponse } from "axios"
import React from "react"
import { Container, Form, FormLabel, ListGroup, Spinner, Col, Row } from "react-bootstrap"
import AirQualityResponse from "../interfaces/air-quality-response"
import GeoCodingSearchResults from "../interfaces/geo-coding-search-results"
import MainWeatherResponse from "../interfaces/weather-response"
import Constants from "../utils/constants"
import WeatherForecastContent from "./WeatherForecastContent"
import SearchResultsCache from "../utils/search-results-cache"
import SearchResultsCacheData from "../interfaces/search-results-cache-data"

const BaseInput = () => {

    const [weatherData, setWeatherData] = React.useState<MainWeatherResponse>()
    const [airQualityData, setAirQualityData] = React.useState<AirQualityResponse>()

    const [latitude, setLatitude] = React.useState<number>(0)
    const [longitude, setLongitude] = React.useState<number>(0)
    const [ownLatitude, setOwnLatitude] = React.useState<number>(0)
    const [ownLongitude, setOwnLongitude] = React.useState<number>(0)

    const [isMyLocationDisabled, setMyLocationDisabled] = React.useState<boolean>(true)
    const [showCachedResults, setShowCachedResults] = React.useState<boolean>(false)
    const [searchFromCache, setSearchFromCache] = React.useState<number>(0)

    const [isLoading, setLoading] = React.useState<boolean>(false)
    const [state, setState] = React.useState<"initial" | "searching" | "found">("initial")

    const [geoLocation, setGeoLocation] = React.useState<string>('')
    const [searchedGeoLocation, setSearchedGeoLocation] = React.useState<string>('')
    const [locationType, setLocationType] = React.useState<"self" | "other">('other')

    const [searchText, setSearchText] = React.useState<string>('')
    const [searchResults, setSearchResults] = React.useState<GeoCodingSearchResults[]>([])
    const [cachedResults, setCachedResults] = React.useState<SearchResultsCacheData[]>([])

    const getWeatherAndtGeoLocation = () => {
        setLoading(true)
        const APIRequests = [
            axios.get(Constants.WeatherURL.replace("LAT", latitude.toString()).replace("LNG", longitude.toString())),
            axios.get(Constants.AirQualityURL.replace("LAT", latitude.toString()).replace("LNG", longitude.toString()))
        ]
        if (searchFromCache == -1) {
            APIRequests.push(axios.get(Constants.GeoLocationURL.replace("LAT", latitude.toString()).replace("LNG", longitude.toString())))
        }
        axios.all(APIRequests)
            .then((data: AxiosResponse<any, any>[]) => {
                if (data[0].status == 200) {
                    const weatherResponseData = data[0].data
                    const time: string[] = weatherResponseData.daily.time
                    let maximumHumidity: number[] = new Array(time.length).fill(0)
                    time.forEach((t: string, dailyIndex: number) => {
                        weatherResponseData.hourly.time.forEach((t2: string, hourlyIndex: number) => {
                            if (t2.includes(t) && weatherResponseData.hourly.relativehumidity_2m[hourlyIndex] > maximumHumidity[dailyIndex]) {
                                maximumHumidity[dailyIndex] = weatherResponseData.hourly.relativehumidity_2m[hourlyIndex]
                            }
                        })
                    })
                    setWeatherData({ latitude: weatherResponseData.latitude, longitude: weatherResponseData.longitude, relativehumidity_2m: maximumHumidity, ...weatherResponseData.daily })
                }
                if (data[0].status == 200 && data[1].status == 200) {
                    const time: string[] = data[0].data.daily.time
                    let averageAQI: number[] = new Array(time.length).fill(0)
                    time.forEach((t: string, dailyIndex: number) => {
                        let count = 0
                        data[1].data.hourly.time.forEach((t2: string, hourlyIndex: number) => {
                            if (t2.includes(t) && data[1].data.hourly.us_aqi[hourlyIndex]) {
                                averageAQI[dailyIndex] += data[1].data.hourly.us_aqi[hourlyIndex]
                                count++
                            }
                        })
                        averageAQI[dailyIndex] = (count > 0 ? Number(Number(averageAQI[dailyIndex] / count).toFixed(1)) : 0)
                    })
                    setAirQualityData({ latitude: data[1].data.latitude, longitude: data[1].data.longitude, time, us_aqi: averageAQI })
                }
                if (data.length == 3 && data[2].status == 200) {
                    try {
                        setGeoLocation(data[2].data.features[0].properties.display_name)
                        if (searchFromCache == -1) {
                            SearchResultsCache.addSearchResult(latitude, longitude, searchedGeoLocation, data[2].data.features[0].properties.display_name)
                        }
                    } catch (error) { }
                }
                if (data[0].status == 200 && data[1].status == 200 && (data.length == 2 || (data.length == 3 && data[2].status == 200))) {
                    setState("found")
                    setSearchFromCache(0)
                    setCachedResults(SearchResultsCache.getSearchResults())
                }
                setLoading(false)
            }).catch((error: any) => {
                alert('Some Network Error Occurred')
                setLoading(false)
            })
    }

    const getGeoCoding = () => {
        setLoading(true)
        axios.get(Constants.GeoCodingURL.replace("SEARCH", searchText)).then((data: AxiosResponse<any, any>) => {
            if (data.status == 200) {
                setSearchResults(data.data.results?.filter((srchRes: GeoCodingSearchResults) => !SearchResultsCache.getSearchResults().find((value: SearchResultsCacheData) => getCompleteLocation(srchRes) == value.searchName)) || [])
            }
            setLoading(false)
        }).catch((error: any) => {
            alert('Some Network Error Occurred')
            setLoading(false)
        })
    }

    const selectSearchResults = (id: number) => {
        const locationResult = searchResults.find((searchResult: GeoCodingSearchResults) => searchResult.id == id)
        if (locationResult) {
            setLatitude(locationResult.latitude)
            setLongitude(locationResult.longitude)
            setSearchedGeoLocation(getCompleteLocation(locationResult))
            setSearchFromCache(-1)
            setState("searching")
            setSearchText("")
        }
    }

    const selectSearchResultsFromCache = (displayName: string) => {
        const locationResult = SearchResultsCache.getSearchResultByDisplayName(displayName)
        if (locationResult.data) {
            setLatitude(locationResult.data.latitude)
            setLongitude(locationResult.data.longitude)
            setSearchedGeoLocation(locationResult.data.searchName)
            if (locationResult.outdated) {
                setSearchFromCache(-1)
            } else {
                setGeoLocation(locationResult.data.displayName)
                setSearchFromCache(1)
            }
            setState("searching")
            setSearchText("")
        }
    }

    const getCompleteLocation = (location: GeoCodingSearchResults): string => {
        const locationParts: string[] = [location.name]
        if (location.admin4)
            locationParts.push(location.admin4)
        if (location.admin3)
            locationParts.push(location.admin3)
        if (location.admin2)
            locationParts.push(location.admin2)
        if (location.admin1)
            locationParts.push(location.admin1)
        locationParts.push(location.country)
        return locationParts.join(", ")
    }

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((location: any) => {
            setOwnLatitude(location.coords.latitude)
            setOwnLongitude(location.coords.longitude)
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
            const locationResult = SearchResultsCache.getSearchResultBLatLng(location.coords.latitude, location.coords.longitude)
            if (locationResult.data) {
                if (locationResult.outdated) {
                    setSearchFromCache(-1)
                } else {
                    setGeoLocation(locationResult.data.displayName)
                    setSearchFromCache(1)
                }
            } else {
                setSearchFromCache(-1)
            }
            setState("searching")
            setMyLocationDisabled(false)
            setLocationType("self")
        }, (error: any) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Permission denied for Geolocation access.")
                    break
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.")
                    break
                case error.TIMEOUT:
                    alert("The request to get location timed out.")
                    break
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.")
                    break
            }
        })
    }, [])

    React.useEffect(() => {
        if (searchFromCache != 0 && state == "searching") {
            setShowCachedResults(false)
            setSearchResults([])
            getWeatherAndtGeoLocation()
        }
    }, [state, searchFromCache])

    React.useEffect(() => {
        setCachedResults(SearchResultsCache.getSearchResults().filter((value: SearchResultsCacheData) => value.searchName.includes(searchText)))
        if (searchText.length >= 4) {
            getGeoCoding()
        }
    }, [searchText])

    React.useEffect(() => {
        if (locationType == "self") {
            const locationResult = SearchResultsCache.getSearchResultBLatLng(ownLatitude, ownLongitude)
            if (locationResult.data) {
                setSearchedGeoLocation(locationResult.data.searchName)
                if (locationResult.outdated) {
                    setSearchFromCache(-1)
                } else {
                    setGeoLocation(locationResult.data.displayName)
                    setSearchFromCache(1)
                }
            } else {
                setSearchFromCache(-1)
            }
            setState("searching")
            setLatitude(ownLatitude)
            setLongitude(ownLongitude)
        } else {
            setCachedResults(SearchResultsCache.getSearchResults())
            setState("initial")
        }
    }, [locationType])

    return <>
        <br />
        <h2 className="text-warning text-center">Weather Report & Forecast</h2>
        <hr />
        <Container>
            <FormLabel>Show Forecast for:</FormLabel>
            <Form.Check label="My Current Location" name="select-location" type="radio" checked={locationType == "self"} id="select-location-button-1" onChange={$e => setLocationType("self")} disabled={isMyLocationDisabled} />
            <Form.Check label="Search Location" name="select-location" type="radio" checked={locationType == "other"} id="select-location-button-2" onChange={$e => setLocationType("other")} />

            {locationType == "other" && <Form.Group controlId="type-field">
                <Form.Control type="text" placeholder="Search Here..." value={searchText} onChange={$e => setSearchText($e.target.value)} onFocus={() => setShowCachedResults(true)} onBlur={() => setShowCachedResults(false)} />
            </Form.Group>}

            {locationType == "other" && <ListGroup>
                {showCachedResults && cachedResults.filter((searchResultCache: SearchResultsCacheData) => searchResultCache.searchName != "").slice(0, 10).map((searchResultCache: SearchResultsCacheData) => <ListGroup.Item className="bg-dark text-light custom-list-item" key={searchResultCache.displayName} action onMouseDown={() => selectSearchResultsFromCache(searchResultCache.displayName)}><i className="material-icons">history</i> {searchResultCache.searchName}</ListGroup.Item>)}

                {searchResults.map((searchResult: GeoCodingSearchResults) => <ListGroup.Item className="bg-dark text-light custom-list-item" key={searchResult.id} action onMouseDown={() => selectSearchResults(searchResult.id)}><i className="material-icons">arrow_outward</i>{getCompleteLocation(searchResult)}</ListGroup.Item>)}
            </ListGroup>}
        </Container >
        <br />
        {isLoading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
        {
            !isLoading && <Container fluid>
                <Row>
                    <Col xs="1"><i className="material-icons text-danger">location_on</i></Col>
                    <Col xs="11"><span className="text-success fw-bold"><em>{geoLocation}</em></span></Col>
                </Row>
            </Container>
        }
        <br />
        {state == "found" && <WeatherForecastContent weatherData={weatherData} airQualityData={airQualityData} />}
        <hr />
    </>
}

export default BaseInput