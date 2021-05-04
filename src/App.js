import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function App() {
  const [movieSearch, setMovieSearch] = useState("");
  const [movieQuery, setmovieQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [movieNominations, setMovieNominations] = useState([]);

  async function searchMovie(e) {
    e.preventDefault();
    await fetch(
      `http://www.omdbapi.com/?s=${movieSearch}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((movies) => setMovieResults(movies.Search));
    setmovieQuery(movieSearch);
    setMovieSearch("");
  }

  function MovieResult(movie, i) {
    return (
      <div key={i} style={{ marginBottom: "10px" }}>
        • {movie.Title} ({movie.Year}){" "}
        {
          movieNominations.indexOf(movie) === -1 ?
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMovieNominations([...movieNominations, movie])}
          >
            Nominate
          </Button> :
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMovieNominations([...movieNominations, movie])}
            disabled
          >
            Nominate
          </Button>
        }
      </div>
    );
  }

  function MovieNomination(movie, i) {
    return (
      <div key={i} style={{ marginBottom: "10px" }}>
        • {movie.Title} ({movie.Year}){" "}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const newMovieNominations = movieNominations;
            movieNominations.splice(newMovieNominations.indexOf(movie), 1);
            setMovieNominations([...newMovieNominations]);
          }}
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <h1 style={{marginBottom: "0"}}>THE SHOPPIES</h1>
      <b>PRESENTED BY VINCENT TIEU</b>
      <br />
      <br />
      <form className="movie-search-form" onSubmit={(e) => searchMovie(e)}>
        <TextField
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
          label="Enter Movie Name Here"
          variant="outlined"
          style={{ width: "100%", marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <div className="movie-columns">
        <div className="movie-results">
          {movieQuery !== "" ? (
            <h3>Movie query "{movieQuery}"</h3>
          ) : (
            <h3>Movie query</h3>
          )}
          <hr />
          {movieResults.map((movie, i) => {
            return MovieResult(movie, i);
          })}
        </div>
        <div className="movie-nominations">
          <h3>Nominations</h3>
          <hr />
          {movieNominations.map((movie, i) => {
            return MovieNomination(movie, i);
          })}
        </div>
      </div>
      <div className="footer">
        I really enjoyed making this! Check out my source code <a href="https://github.com/vincentktieu101/TheShoppies" blank="_target">here</a>.
      </div>
    </Container>
  );
}
