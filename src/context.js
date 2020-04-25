import React, { createContext, useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'

import appData from "./utilities/appData"

const Context = createContext()
export default Context

export function Provider( props ) {

  theMovieDb.common.api_key = process.env.REACT_APP_TMDB_API_KEY

  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  useEffect( ()=>{
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
  }, [] )

  return (

    <Context.Provider value={{
      isLoading,
      errorMessage,
      movies,
    }}>
      { props.children }
    </Context.Provider>

  )

}
