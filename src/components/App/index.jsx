import React, { useContext } from 'react'

import "./styles.scss"
import Context from '../../Context'


function App() {

  const context = useContext( Context )

  return <div className="App">

    <h1>
      Questions about movies
      { context.isLoading && (
        <small style={{ fontSize:'1rem' }}> Loading</small>
      ) }
    </h1>
    <p>For the given years,</p>
    <ul>
      <li>How many women or men directed movies?</li>
      <li>How many women or men directed Oscar-winning movies?</li>
      <li>How many women or men comprised the crew of movies?</li>
      <li>How many women or men comprised the cast of movies?</li>
    </ul>
    <p><small>As told by data from <a href="https://www.themoviedb.org/">The Movie Database</a>.</small></p>

    <p style={{ color:'red' }}>{ context.errorMessage }</p>

    <h2>Sort by</h2>
    <button onClick={ ()=> context.setDiscoverOptions({
      sort_by: 'popularity.desc'
    }) }>
      Popularity
    </button>
    <button onClick={ ()=> context.setDiscoverOptions({
      sort_by: 'primary_release_date.desc',
      'primary_release_date.lte': '2019-08-04'
    }) }>
      Release date
    </button>
    <button onClick={ ()=> context.setDiscoverOptions({
      sort_by: 'revenue.desc'
    }) }>
      Revenue
    </button>
    <button onClick={ ()=> context.setDiscoverOptions({
      sort_by: 'vote_average.desc'
    }) }>
      Voting (um?)
    </button>

    { context.movies && ( <>
    <h2>Results</h2>
    <div className="results">

      <ul>
      { context.movies.map( ( movie, key ) => {

        const posterUrl = context.configuration
          ? context.configuration.images.base_url + context.configuration.images.poster_sizes[0] + movie.poster_path
          : ""
        const movieUrl = 'https://www.themoviedb.org/movie/' + movie.id

        return (
        <li key={ key } style={{ marginBottom:'1em', display:'flex', alignItems:'center' }}>

          <a href={ movieUrl }>
            <img
              src={ posterUrl }
              alt={ 'Poster for ' + movie.title }
              style={{ marginRight:'1em' }}
            />
          </a>

          <span>
            <strong><a href={ movieUrl }>
              { movie.title }
            </a></strong><br />
            <small>
              Released: { movie.release_date }
            </small><br />
            <small>
              Crew: { movie.crew }
            </small><br />
          </span>

          <div>
          </div>

        </li>
        )

      } ) }
      </ul>

    </div>
    </> ) }

    <h2>Assumptions</h2>
    <p>English, US releases, not adult film, not video, runtime an hour or more.</p>

  </div>

}

export default App
