import theMovieDb from 'themoviedb-javascript-library'


export async function discoverMovies2( options ) {

  let result = {}
  console.log('result before',result)

  try {

    theMovieDb.discover.getMovies(
      options,
      async response => {
        const json = JSON.parse( response )
        result = json
        console.log('result in resolve',result)
        return json

        //console.log('await getMovieCredits(json.results[0].id)',await getMovieCredits(json.results[0].id))

        //setMovies( json.results )
        //setIsLoading( false )
      },
      async error => {
        const json = JSON.parse( error )
        result = json
        return json

        //setErrorMessage( 'api.themoviedb.org ERROR ' + errorJson.status_code + ': ' + errorJson.status_message )
        //setIsLoading( false )
      }
    )
    console.log('result in try after getMovies',result)

  }
  catch (error) {
    console.error('error',error)
  }

  //console.log('functionreturn',functionreturn)
  console.log('result after',result)

}

export async function discoverMovies( options ) {

  return await discoverMovies2( options )

}

export async function getMovieCredits( id ) {
  console.log('getMovieCredits()')

  let response = false
  let error = false

  const functionReturn = await theMovieDb.movies.getCredits(
    { id },
    async rsp => {
      console.log('successCB response before set', response)
      response = JSON.parse( rsp )
      console.log('successCB response', response)
    },
    async err => {
      console.error( err )
      error = JSON.parse( error )
      console.log('failureCB error', error)
    }
  )
  console.log('functionReturn',functionReturn)

  return {
    response,
    error,
  }

}
