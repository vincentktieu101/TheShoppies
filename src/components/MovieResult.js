import React from "react";
import Button from "@material-ui/core/Button";

export default function MovieResult(
  movie,
  i,
  movieNominations,
  setMovieNominations
) {
  return (
    <div key={i} style={{ marginBottom: "10px" }}>
      • {movie.Title} ({movie.Year}){" "}
      {movieNominations.indexOf(movie) === -1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setMovieNominations([...movieNominations, movie])}
        >
          Nominate
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setMovieNominations([...movieNominations, movie])}
          disabled
        >
          Nominate
        </Button>
      )}
    </div>
  );
}
