import React, { createContext, useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'


const Context = createContext()
export default Context

export function Provider( props ) {

  theMovieDb.common.api_key = process.env.REACT_APP_TMDB_API_KEY

  const [isLoading, setIsLoading] = useState(false)
  const [configuration, setConfiguration] = useState()
  const [discoverOptions, setDiscoverOptions] = useState({})
  const [movies, setMovies] = useState()
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
        const json = JSON.parse( error )
        setErrorMessage( 'api.themoviedb.org ERROR ' + json.status_code + ': ' + json.status_message )
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
        setIsLoading( false )
      },
      error => {
        console.error( error )
        const json = JSON.parse( error )
        setErrorMessage( 'api.themoviedb.org ERROR ' + json.status_code + ': ' + json.status_message )
        setIsLoading( false )
      }
    )

  }, [discoverOptions] )

  // Credits
  useEffect( ()=>{

    if ( ! movies ) return

    setIsLoading( true )

    movies.map( movie => {
      theMovieDb.movies.getCredits(
        {
          id: movie.id
        },
        response => {
          const json = JSON.parse( response )
          console.log('json',json)
          setIsLoading( false )
        },
        error => {
          console.error( error )
          const json = JSON.parse( error )
          setErrorMessage( 'api.themoviedb.org ERROR ' + json.status_code + ': ' + json.status_message )
          setIsLoading( false )
        }
      )
    } )

  }, [movies] )

  return (

    <Context.Provider value={{
      isLoading,
      errorMessage,
      configuration,
      movies,
      setDiscoverOptions,
    }}>
      { props.children }
    </Context.Provider>

  )

}
