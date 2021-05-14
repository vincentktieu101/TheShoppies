import React from "react";
import Button from "@material-ui/core/Button";

export default function MovieResult({
  movie,
  movieNominations,
  nominateMovie,
}) {
  return (
    <div style={{ marginBottom: "10px" }}>
      • {movie.Title} ({movie.Year}){" "}
      {movieNominations.indexOf(movie) === -1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => nominateMovie(movie)}
        >
          Nominate
        </Button>
      ) : (
        <Button variant="contained" color="primary" disabled>
          Nominate
        </Button>
      )}
    </div>
  );
}
