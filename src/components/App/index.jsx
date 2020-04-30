import React, { useContext } from 'react'
import { Container, Alert, Button, Row, Col } from "react-bootstrap"
import { Doughnut } from "react-chartjs-2"

import "./styles.scss"
import Context from '../../Context'


export default function App() {

  const {
    isLoading,
    errorMessage,
    movies,
    fetchTmdbData,
  } = useContext( Context )

  const movieData = getDataFromMovies( movies )
  console.log('movieData',movieData)

  return <div className="App">

    <header className="hero">
    <Container>
      <h1>
        TMDb Stats
        { isLoading && (
          <small style={{ fontSize:"1rem",float:"right" }}> Loading</small>
        ) }
      </h1>
      { errorMessage && (
        <Alert variant="danger">{ errorMessage }</Alert>
      ) }
    </Container>
    </header>

    <section style={{ paddingBottom:"4rem" }}>
    <Container>

      <Row>
      <Col md="6">
        <div className="stat">

          <h2>All cast</h2>
          <Doughnut
            legend={{
              position: "right",
            }}
            data={{
          	labels: [
          		'Unspecified',
          		'Female',
          		'Male',
          	],
          	datasets: [{
          		data: Object.values( movieData.castGenders ),
          		backgroundColor: [
          		'#f1e1c1',
          		'#FF6384',
          		'#36A2EB',
          		],
          	}]
          }} />

        </div>
      </Col>
      <Col md="6">
        <div className="stat">

          <h2>All crew</h2>
          <Doughnut data={{
          	labels: [
          		'Unspecified',
          		'Female',
          		'Male',
          	],
          	datasets: [{
          		data: Object.values( movieData.crewGenders ),
          		backgroundColor: [
          		'#f1e1c1',
          		'#FF6384',
          		'#36A2EB',
          		],
          	}]
          }} />

        </div>
      </Col>
      </Row>


      {/*
      <p>For the given years, genders of</p>
      <ol>
        <li>all crew</li>
        <li>directors</li>
        <li>directors of Oscar-winning movies</li>
        <li>Oscar-winning directors</li>
        <li>all cast</li>
        <li>top-billed cast (top 1? 3? x?)</li>
        <li>Oscar-winning cast (or maybe not cause there&rsquo;s always one male and one female)</li>
      </ol>
      */}

      {/* movies && ( <>
      <h2>Results</h2>
      <div className="results">

        <ol>
        { movies.map( ( movie, key ) => (

          <li key={ key }>
            <strong><a href={ `https://www.themoviedb.org/movie/${movie.id}` }>
              { movie.title }
            </a></strong>{" "}
            <small>Released: { movie.release_date }</small><br />
            <span>Cast</span>
            <ol>
            { movie.cast && movie.cast.map( ( member, key ) => (
              <li key={ key }>
                { member.name + " " }
                <small>{ member.character }, gdr:{ member.gender }</small>
              </li>
            ) ) }
            </ol>
            <span>Crew</span>
            <ol>
            { movie.crew && movie.crew.map( ( member, key ) => (
              <li key={ key }>
                { member.name + " " }
                <small>{ member.job }, gdr:{ member.gender }</small>
              </li>
            ) ) }
            </ol>
          </li>

        ) ) }
        </ol>

      </div>
      </> ) */}

    </Container>
    </section>

    <footer className="site-footer">
    <Container>
      <p><strong>Assumptions:</strong> English, US releases, not adult film, not video, runtime an hour or more.</p>
      <p><Button size="sm" variant="secondary" onClick={ fetchTmdbData }>Refresh data</Button></p>
    </Container>
    </footer>

  </div>

}

function getDataFromMovies( movies ) {

  let
    castTotal = 0, castGenders = {},
    crewTotal = 0, crewGenders = {}

  movies.forEach( movie => {

    castTotal = castTotal + movie.cast.length
    crewTotal = crewTotal + movie.crew.length

    movie.cast.forEach( person => {
      castGenders[person.gender] = castGenders[person.gender] === undefined ? 1 : castGenders[person.gender] + 1
    } )
    movie.crew.forEach( person => {
      crewGenders[person.gender] = crewGenders[person.gender] === undefined ? 1 : crewGenders[person.gender] + 1
    } )

  } )

  return {
    castTotal, castGenders,
    crewTotal, crewGenders,
  }

}
