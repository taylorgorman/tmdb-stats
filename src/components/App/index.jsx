import React, { useContext } from 'react'
import { Container, Alert } from "react-bootstrap"

import "./styles.scss"
import Context from '../../Context'


export default function App() {

  const context = useContext( Context )

  return <div className="App">
  <Container>

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

    { context.errorMessage && (
      <Alert variant="danger">{ context.errorMessage }</Alert>
    ) }

    { context.movies && ( <>
    <h2>Results</h2>
    <div className="results">

      <ul>
      { context.movies.map( ( movie, key ) => (

        <li key={ key }>
          <strong><a href={ `https://www.themoviedb.org/movie/${movie.id}` }>
            { movie.title }
          </a></strong><br />
          <small>
            Released: { movie.release_date }
          </small>
        </li>

      ) ) }
      </ul>

    </div>
    </> ) }

    <h2>Assumptions</h2>
    <p>English, US releases, not adult film, not video, runtime an hour or more.</p>

  </Container>
  </div>

}
