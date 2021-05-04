import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import getUser from "../utils/get-user.js";
import Layout from "../components/Layout";
import MovieNomination from "../components/MovieNomination";
import MovieResult from "../components/MovieResult";

export default function Home() {
  const user = getUser();
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

  return (
    <Layout user={user}>
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
            <h3>Movie query of "{movieQuery}"</h3>
          ) : (
            <h3>Movie query</h3>
          )}
          <hr />
          {movieResults.map((movie, i) => {
            return MovieResult(movie, i, movieNominations, setMovieNominations);
          })}
        </div>
        <div className="movie-nominations">
          <h3>Nominations</h3>
          <hr />
          {movieNominations.map((movie, i) => {
            return MovieNomination(
              movie,
              i,
              movieNominations,
              setMovieNominations
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
