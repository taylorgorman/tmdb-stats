import React, { createContext, useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'


const Context = createContext()
export default Context

export function Provider( props ) {

  theMovieDb.common.api_key = 'a02a9ab38b1a26fdfe1f08ff1baf9944'

  const [isLoading, setIsLoading] = useState(false)
  const [configuration, setConfiguration] = useState()
  const [discoverOptions, setDiscoverOptions] = useState({})
  const [movies, setMovies] = useState()
  const [moviesTotalCount, setMoviesTotalCount] = useState()
  const [moviesCurrentPage, setMoviesCurrentPage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  // On load
  useEffect( ()=>{

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
        const json = JSON.parse( response )
        setMovies( json.results )
        setMoviesTotalCount( json.total_results )
        setMoviesCurrentPage( json.page )
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

    <Context.Provider value={{
      isLoading,
      errorMessage,
      configuration,
      movies,
      moviesTotalCount,
      moviesCurrentPage,
      setDiscoverOptions,
    }}>
      { props.children }
    </Context.Provider>

  )

}
