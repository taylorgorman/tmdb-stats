import doFetch from "./doFetch"

async function fetchTmdb( endpoint, data ) {

  let [resp, err] = await doFetch (
    `https://api.themoviedb.org/3${endpoint}`,
    "GET",
    data
  )
  return [resp.results, err || resp.status_message]

}

export default async () => {

  const today = new Date()
  const todayFormatted = today.getFullYear()
    + "-"
    + String( today.getMonth() + 1 ).padStart( 2, "0" )
    + "-"
    + String( today.getDate() ).padStart( 2, "0" )

  let [movies, error] = await fetchTmdb ( "/discover/movie", {
    "api_key": process.env.REACT_APP_TMDB_API_KEY,
    region: "US",
    language: "en-US",
    with_original_language: "en",
    include_adult: false,
    include_video: false,
    "with_runtime.gte": 60,
    "primary_release_date.lte": todayFormatted,
    primary_release_year: 2020,
  } )

  if ( error ) return { error }

  return {
    movies
  }

}