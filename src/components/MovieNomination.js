import React from "react";
import Button from "@material-ui/core/Button";

export default function MovieNomination({
  movie,
  unnominateMovie
}) {
  return (
    <div style={{ marginBottom: "10px" }}>
      • {movie.Title} ({movie.Year}){" "}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          unnominateMovie(movie);
        }}
      >
        Remove
      </Button>
    </div>
  );
}
