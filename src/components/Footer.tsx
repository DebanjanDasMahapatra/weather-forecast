import { FormLabel, Container } from 'react-bootstrap'

const Nominatim = () => <a href="https://nominatim.org" target="_blank">Nominatim</a>

const OpenStreetMap = () => <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a>

const OpenMeteo = () => <a href="https://open-meteo.com" target="_blank">Open-Meteo</a>

const GeoNames = () => <a href="https://www.geonames.org" target="_blank">GeoNames</a>

const ECMWF = () => <a href="https://confluence.ecmwf.int/display/CKB/CAMS+Regional%3A+European+air+quality+analysis+and+forecast+data+documentation" target="_blank">ECMWF</a>

const Footer = () => {

    return <Container style={{ fontSize: '12px' }}>
        <p className="text-center fw-bold"><i>Credits, Attribution and Acknowledgement:</i></p>
        <FormLabel><Nominatim /></FormLabel>
        <br />
        <FormLabel><OpenStreetMap /> (Used via <Nominatim />)</FormLabel>
        <br />
        <FormLabel><OpenMeteo /></FormLabel>
        <br />
        <FormLabel><GeoNames /> (Used via <OpenMeteo />)</FormLabel>
        <br />
        <FormLabel><ECMWF /></FormLabel>
        <br />
        <p>METEO FRANCE, Institut national de l'environnement industriel et des risques (Ineris), Aarhus University, Norwegian Meteorological Institute (MET Norway), Jülich Institut für Energie- und Klimaforschung (IEK), Institute of Environmental Protection – National Research Institute (IEP-NRI), Koninklijk Nederlands Meteorologisch Instituut (KNMI), Nederlandse Organisatie voor toegepast-natuurwetenschappelijk onderzoek (TNO), Swedish Meteorological and Hydrological Institute (SMHI), Finnish Meteorological Institute (FMI), Italian National Agency for New Technologies, Energy and Sustainable Economic Development (ENEA) and Barcelona Supercomputing Center (BSC) (2022): CAMS European air quality forecasts, ENSEMBLE data. Copernicus Atmosphere Monitoring Service (CAMS) Atmosphere Data Store (ADS). (Used via <OpenMeteo />)</p>
        <br />
    </Container>
}

export default Footer