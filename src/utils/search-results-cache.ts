import SearchResultsCacheData from "../interfaces/search-results-cache-data"

const LOCAL_STORAGE_KEY = 'search-results-cache'

const processSearchResut = (presentIndex: number, existingData: SearchResultsCacheData[]): { data: SearchResultsCacheData | undefined, outdated: boolean } => {
    let searchResult: SearchResultsCacheData | undefined = undefined
    let outdated: boolean = false
    if (presentIndex != -1) {
        searchResult = existingData[presentIndex]
        if (existingData[presentIndex].used == 9) {
            //if used 9 times, then remove, so that fresh entry can be added to update cache
            existingData.splice(presentIndex, 1)
            outdated = true
        } else {
            //increment the use counter
            existingData[presentIndex] = { ...existingData[presentIndex], used: existingData[presentIndex].used + 1 }
        }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
    return { data: searchResult, outdated }
}

const addSearchResult = (latitude: number, longitude: number, searchName: string, displayName: string) => {
    const existingData = getSearchResults()
    const presentIndex: number = existingData.findIndex((ed: SearchResultsCacheData) => ed.searchName == searchName)
    if (presentIndex == -1) {
        //if not present, add in the cache
        existingData.push({ latitude, longitude, searchName, displayName, used: 1 })
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData))
    }
}

const getSearchResultByDisplayName = (displayName: string): { data: SearchResultsCacheData | undefined, outdated: boolean } => {

    const existingData = getSearchResults()
    const presentIndex: number = existingData.findIndex((ed: SearchResultsCacheData) => ed.displayName == displayName)
    return processSearchResut(presentIndex, existingData)
}

const getSearchResultBLatLng = (latitude: number, longitude: number): { data: SearchResultsCacheData | undefined, outdated: boolean } => {
    const existingData = getSearchResults()
    const presentIndex: number = existingData.findIndex((ed: SearchResultsCacheData) => ed.latitude == latitude && ed.longitude == longitude)
    return processSearchResut(presentIndex, existingData)
}

const getSearchResults = (): SearchResultsCacheData[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
}

const SearchResultsCache = {
    addSearchResult,
    getSearchResultByDisplayName,
    getSearchResultBLatLng,
    getSearchResults
}

export default SearchResultsCache