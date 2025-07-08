const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const HEADERS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

export async function getTrendingTv() {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  const dateStr = threeMonthsAgo.toISOString().split('T')[0]

  const res = await fetch(
    `${BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=350|8|9|15&without_genres=16`,
    HEADERS
  )
  const data = await res.json()
  return data.results
}

export async function getWatchProviders(tvId) {
  const res = await fetch(`${BASE_URL}/tv/${tvId}/watch/providers`, HEADERS)
  const data = await res.json()
  return data.results['US']?.flatrate || []
}

export async function getTrailers(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/videos?language=en-US`,
    HEADERS
  )
  const data = await res.json()
  return data.results
}

export async function getRecommendations(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/recommendations?language=en-US`,
    HEADERS
  )
  const data = await res.json()
  return data.results
}

export async function getTvDetails(tvId) {
  const res = await fetch(`${BASE_URL}/tv/${tvId}?language=en-US`, HEADERS)
  const data = await res.json()
  return data
}

export async function getTvCredits(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/credits?language=en-US`,
    HEADERS
  )
  const data = await res.json()
  return data
}

export async function searchTv(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=en-US`,
    HEADERS
  )
  const data = await res.json()
  return data.results
}
