interface GeoCodingSearchResults {
    id: number
    name: string
    latitude: number
    longitude: number
    country: string
    admin1?: string
    admin2?: string
    admin3?: string
    admin4?: string
}

export default GeoCodingSearchResults