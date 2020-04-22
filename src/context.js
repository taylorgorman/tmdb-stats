import React, { createContext, useState, useEffect } from 'react'
import theMovieDb from 'themoviedb-javascript-library'

import { doFetch } from "./utilities/hooks"

const Context = createContext()
export default Context

export function Provider( props ) {

  theMovieDb.common.api_key = process.env.REACT_APP_TMDB_API_KEY

  const [isLoading, setIsLoading] = useState(false)
  const [configuration, setConfiguration] = useState()
  const [discoverOptions, setDiscoverOptions] = useState({})
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  // Configuration
  // pretty much only used for images
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
  async function functionName(){
    console.log('discover')

    setIsLoading( true )

    const today = new Date()
    const todayFormatted = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2,"0") + "-" + String(today.getDate()).padStart(2,"0")
    let page = 1
    let totalPages = 9
    let movieFetches = []

    while ( page < Math.min(totalPages,10) ) {

      const [res,err] = await doFetch( "https://api.themoviedb.org/3/discover/movie", "GET", {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
          ...discoverOptions,
          region: 'US',
          language: 'en-US',
          with_original_language: 'en',
          include_adult: false,
          include_video: false,
          "with_runtime.gte": 60,
          'primary_release_date.lte': todayFormatted,
          primary_release_year: 2020,
          page
      } )
      if ( err ) break
      movieFetches.push(...res.results)
      totalPages = res.total_pages

      page++

    }
    setMovies(movieFetches)

  }functionName()
  }, [discoverOptions] )

  // Credits
  //useEffect( ()=>{
  //
  //  if ( ! movies ) return
  //
  //  setIsLoading( true )
  //
  //  movies.map( movie => {
  //    theMovieDb.movies.getCredits(
  //      {
  //        id: movie.id
  //      },
  //      response => {
  //        const json = JSON.parse( response )
  //        setIsLoading( false )
  //      },
  //      error => {
  //        console.error( error )
  //        const json = JSON.parse( error )
  //        setErrorMessage( 'api.themoviedb.org ERROR ' + json.status_code + ': ' + json.status_message )
  //        setIsLoading( false )
  //      }
  //    )
  //  } )
  //
  //}, [movies] )

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
