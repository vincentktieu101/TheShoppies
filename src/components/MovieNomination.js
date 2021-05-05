import React from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";

export default function MovieNomination(
  movie,
  i,
  user,
  movieNominations,
  setMovieNominations
) {
  async function deleteMovie() {
    const newMovieNominations = movieNominations;
    movieNominations.splice(newMovieNominations.indexOf(movie), 1);
    setMovieNominations([...newMovieNominations]);
    if (user !== null) {
      const db = firebase.firestore();
      var userRef = db.collection("users").doc(user.ID);
      await userRef.set({ID: user.ID});
      userRef.update({
        nominations: [...movieNominations]
      });
    }
  }
  return (
    <div key={i} style={{ marginBottom: "10px" }}>
      • {movie.Title} ({movie.Year}){" "}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          deleteMovie()
        }}
      >
        Remove
      </Button>
    </div>
  );
}
