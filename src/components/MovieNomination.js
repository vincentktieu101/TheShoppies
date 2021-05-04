import React from "react";
import Button from "@material-ui/core/Button";

export default function MovieNomination(
  movie,
  i,
  movieNominations,
  setMovieNominations
) {
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
