import doFetch from "./doFetch"

async function fetchTmdb( endpoint, data ) {

  let [resp, err] = await doFetch (
    `https://api.themoviedb.org/3${endpoint}`,
    "GET",
    data
  )
  return [resp, err]

}

export default async () => {

  // Today's date
  const today = new Date()
  const todayFormatted = today.getFullYear()
    + "-"
    + String( today.getMonth() + 1 ).padStart( 2, "0" )
    + "-"
    + String( today.getDate() ).padStart( 2, "0" )

  // Get movies
  let [response, error] = await fetchTmdb( "/discover/movie", {
    "api_key": process.env.REACT_APP_TMDB_API_KEY,
    region: "US",
    language: "en-US",
    with_original_language: "en",
    include_adult: false,
    include_video: false,
    "with_runtime.gte": 60,
    "primary_release_date.lte": todayFormatted,
    primary_release_year: 2020,
    "append_to_response": "people"
  } )
  if ( error ) return { error }
  let movies = response.results

  // Get cast and crew
  movies = await Promise.all( movies.map( async movie => {

    let [credits, error] = await fetchTmdb( `/movie/${movie.id}/credits`, {
      "api_key": process.env.REACT_APP_TMDB_API_KEY,
      region: "US",
      language: "en-US",
      with_original_language: "en",
      include_adult: false,
      include_video: false,
      "with_runtime.gte": 60,
      "primary_release_date.lte": todayFormatted,
      primary_release_year: 2020,
      "append_to_response": "people"
    } )
    if ( error ) return { error }
    movie.cast = credits.cast
    movie.crew = credits.crew
    return movie

  } ) )

  return {
    movies
  }

}