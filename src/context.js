import React, { createContext, useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'

import appData from "./utilities/appData"
import useLocalStorage from "./utilities/useLocalStorage"


const Context = createContext()
export default Context

export function Provider( props ) {

  theMovieDb.common.api_key = process.env.REACT_APP_TMDB_API_KEY

  const [isLoading, setIsLoading] = useState( false )
  const [movies, setMovies] = useLocalStorage( "movies", null )
  //const [movies, setMovies] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  function fetchTmdbData() {

    setIsLoading( true )
    const doAsync = async () => {

      const {
        movies,
        error
      } = await appData()

      if ( error && error.message ) {
        setErrorMessage( error.message )
      }
      else {
        setMovies( movies )
      }
      setIsLoading( false )

    }
    doAsync()

  }

  useEffect( ()=>{
    if ( ! movies ) fetchTmdbData()
  }, [] )

  return (

    <Context.Provider value={{
      isLoading,
      errorMessage,
      movies,
      fetchTmdbData,
    }}>
      { props.children }
    </Context.Provider>

  )

}
