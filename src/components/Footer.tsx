import { FormLabel, Container, Row, Col } from 'react-bootstrap'

const Nominatim = () => <a href="https://nominatim.org" target="_blank">Nominatim</a>

const OpenStreetMap = () => <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a>

const OpenMeteo = () => <a href="https://open-meteo.com" target="_blank">Open-Meteo</a>

const GeoNames = () => <a href="https://www.geonames.org" target="_blank">GeoNames</a>

const ECMWF = () => <a href="https://confluence.ecmwf.int/display/CKB/CAMS+Regional%3A+European+air+quality+analysis+and+forecast+data+documentation" target="_blank">ECMWF</a>

const Sunrise = () => <a href="https://www.flaticon.com/free-icons/sunrise" target="_blank">Sunrise icons by kosonicon</a>

const Sunset = () => <a href="https://www.flaticon.com/free-icons/sunset" target="_blank">Sunset icons by kosonicon</a>

const Rain = () => <a href="https://www.flaticon.com/free-icons/rain" target="_blank">Rain icons by Umeicon</a>

const UVIndex = () => <a href="https://www.flaticon.com/free-icons/uv-index" target="_blank">UV Index icons by Freepik</a>

const AirQuality = () => <a href="https://www.flaticon.com/free-icons/air-filter" target="_blank">Air filter icons by Freepik</a>

const Humidity = () => <a href="https://www.flaticon.com/free-icons/humidity" target="_blank">Humidity icons by Freepik</a>

const Wind = () => <a href="https://www.flaticon.com/free-icons/wind" title="wind icons">Wind icons by Freepik</a>

const Flaticon = () => <a href="https://www.flaticon.com" target="_blank">Flaticon</a>

const Footer = () => {

    return <Container style={{ fontSize: '12px' }}>
        <p className="text-center fw-bold"><i>Credits, Attribution and Acknowledgement:</i></p>
        <Row>
            <Col>
                <p style={{ fontStyle: 'italic' }}>Data Sources:</p>
                <FormLabel><Nominatim /></FormLabel>, <FormLabel><OpenStreetMap /> (Used via <Nominatim />)</FormLabel>, <FormLabel><OpenMeteo /></FormLabel>, <FormLabel><GeoNames /> (Used via <OpenMeteo />)</FormLabel>, <FormLabel><ECMWF /></FormLabel>
                <br />
                <p>METEO FRANCE, Institut national de l'environnement industriel et des risques (Ineris), Aarhus University, Norwegian Meteorological Institute (MET Norway), Jülich Institut für Energie- und Klimaforschung (IEK), Institute of Environmental Protection - National Research Institute (IEP-NRI), Koninklijk Nederlands Meteorologisch Instituut (KNMI), Nederlandse Organisatie voor toegepast-natuurwetenschappelijk onderzoek (TNO), Swedish Meteorological and Hydrological Institute (SMHI), Finnish Meteorological Institute (FMI), Italian National Agency for New Technologies, Energy and Sustainable Economic Development (ENEA) and Barcelona Supercomputing Center (BSC) (2022): CAMS European air quality forecasts, ENSEMBLE data. Copernicus Atmosphere Monitoring Service (CAMS) Atmosphere Data Store (ADS). (Used via <OpenMeteo />)</p>
            </Col>
            <Col sm={2}>
                <p style={{ fontStyle: 'italic' }}>Icons by <Flaticon />:</p>
                <FormLabel><Sunrise /></FormLabel>, <FormLabel><Sunset /></FormLabel>, <FormLabel><Humidity /></FormLabel>, <FormLabel><Rain /></FormLabel>, <FormLabel><AirQuality /></FormLabel>, <FormLabel><UVIndex /></FormLabel>, <FormLabel><Wind /></FormLabel>
                <br />
            </Col>
        </Row>
        <br />
    </Container>
}

export default Footer