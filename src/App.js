import React, { useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'

function App() {

  theMovieDb.common.api_key = 'a02a9ab38b1a26fdfe1f08ff1baf9944'

  const [isLoading, setIsLoading] = useState(false)
  const [discoverOptions, setDiscoverOptions] = useState({})
  const [discover, setDiscover] = useState()
  const [configuration, setConfiguration] = useState()
  const [errorMessage, setErrorMessage] = useState()

  // On load
  useEffect( ()=>{
    console.log('useEffect([])')

    setIsLoading( true )

    theMovieDb.configurations.getConfiguration(
      response => {
        setConfiguration( JSON.parse( response ) )
        setIsLoading( false )
      },
      error => {
        console.error( error )
        const errorJson = JSON.parse( error )
        setErrorMessage( 'api.themoviedb.org ERROR ' + errorJson.status_code + ': ' + errorJson.status_message )
        setIsLoading( false )
      }
    )

  }, [] )

  // Discover
  useEffect( ()=>{
    console.log('useEffect([discoverOptions])')

    setIsLoading( true )

    theMovieDb.discover.getMovies(
      {
        ...discoverOptions,
        region: 'US',
        language: 'en-US',
        with_original_language: 'en',
        include_adult: false,
        include_video: false,
        'with_runtime.gte': 60,
      },
      response => {
        setDiscover( JSON.parse( response ) )
        setIsLoading( false )
      },
      error => {
        console.error( error )
        const errorJson = JSON.parse( error )
        setErrorMessage( 'api.themoviedb.org ERROR ' + errorJson.status_code + ': ' + errorJson.status_message )
        setIsLoading( false )
      }
    )

  }, [discoverOptions] )


  return (
  <div className="App">

    <h1>
      The Movie Database Stats
      { isLoading && <small style={{ fontSize:'1rem' }}> Loading</small> }
    </h1>

    <p style={{ color:'red' }}>{ errorMessage }</p>

    <h2>Sort by</h2>
    <button onClick={ ()=> setDiscoverOptions({
      sort_by: 'popularity.desc'
    }) }>
      Popularity
    </button>
    <button onClick={ ()=> setDiscoverOptions({
      sort_by: 'primary_release_date.desc',
      'primary_release_date.lte': '2019-08-04'
    }) }>
      Release date
    </button>
    <button onClick={ ()=> setDiscoverOptions({
      sort_by: 'revenue.desc'
    }) }>
      Revenue
    </button>
    <button onClick={ ()=> setDiscoverOptions({
      sort_by: 'vote_average.desc'
    }) }>
      Voting (um?)
    </button>

    <h2>Results</h2>
    { discover && (
    <div className="results">

      <p>Total results: { discover.total_results }</p>
      <p>Current page: { discover.page }</p>

      <ul>
      { discover.results.map( ( movie, key ) => (
        <li key={ key } style={{ marginBottom:'1em', display:'flex', alignItems:'center' }}>

          <a href={ 'https://www.themoviedb.org/movie/' + movie.id }>
            <img
              src={ configuration.images.base_url + configuration.images.poster_sizes[0] + movie.poster_path }
              alt={ 'Poster for ' + movie.title }
              style={{ marginRight:'1em' }}
            />
          </a>

          <span>
            <strong><a href={ 'https://www.themoviedb.org/movie/' + movie.id }>
              { movie.title }
            </a></strong><br />
            <small>
              Released: { movie.release_date }
            </small>
          </span>

        </li>
      ) ) }
      </ul>

    </div>
    ) }

    <h2>Assumptions</h2>
    <p>English, US releases, not adult film, not video, runtime an hour or more.</p>

  </div>
  )

}

export default App
