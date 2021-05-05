import React from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";

export default function MovieResult(
  movie,
  i,
  user,
  movieNominations,
  setMovieNominations
) {
  async function nominateMovie() {
    setMovieNominations([...movieNominations, movie]);
    if (user !== null) {
      const db = firebase.firestore();
      var userRef = db.collection("users").doc(user.ID);
      await userRef.set({ID: user.ID});
      userRef.update({
        nominations: [...movieNominations, movie]
      });
    }
  }
  return (
    <div key={i} style={{ marginBottom: "10px" }}>
      • {movie.Title} ({movie.Year}){" "}
      {movieNominations.indexOf(movie) === -1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => nominateMovie()}
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
