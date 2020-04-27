import React, { useContext } from 'react'
import { Container, Alert } from "react-bootstrap"

import "./styles.scss"
import Context from '../../Context'


export default function App() {

  const {
    isLoading,
    errorMessage,
    movies,
    fetchTmdbData,
  } = useContext( Context )

  return <div className="App">
  <Container>

    <h1>
      Questions about movies
      { isLoading && (
        <small style={{ fontSize:'1rem' }}> Loading</small>
      ) }
    </h1>
    <p><button onClick={ fetchTmdbData }>Refresh data</button></p>
    <p>For the given years,</p>
    <ul>
      <li>How many women or men directed movies?</li>
      <li>How many women or men directed Oscar-winning movies?</li>
      <li>How many women or men comprised the crew of movies?</li>
      <li>How many women or men comprised the cast of movies?</li>
    </ul>
    <p><small>As told by data from <a href="https://www.themoviedb.org/">The Movie Database</a>.</small></p>

    { errorMessage && (
      <Alert variant="danger">{ errorMessage }</Alert>
    ) }

    { movies && ( <>
    <h2>Results</h2>
    <div className="results">

      <ol>
      { movies.map( ( movie, key ) => {
        console.log('movie.cast',movie.cast)
        return (

        <li key={ key }>
          <strong><a href={ `https://www.themoviedb.org/movie/${movie.id}` }>
            { movie.title }
          </a></strong><br />
          <small>Released: { movie.release_date }</small><br />
          <span>Cast</span>
          <ol>
          { movie.cast && movie.cast.map( ( member, key ) => (
            <li key={ key }>{ member.name }</li>
          ) ) }
          </ol>
          <span>Crew</span>
          <ol>
          { movie.crew && movie.crew.map( ( member, key ) => (
            <li key={ key }>{ member.name }</li>
          ) ) }
          </ol>
        </li>

      ) } ) }
      </ol>

    </div>
    </> ) }

    <h2>Assumptions</h2>
    <p>English, US releases, not adult film, not video, runtime an hour or more.</p>

  </Container>
  </div>

}
