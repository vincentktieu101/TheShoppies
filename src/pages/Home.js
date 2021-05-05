import React, { useEffect, useState } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import getUser from "../utils/get-user.js";
import Layout from "../components/Layout";
import MovieNomination from "../components/MovieNomination";
import MovieResult from "../components/MovieResult";
var firebaseConfig = {
  apiKey: process.env.REACT_APP_AUTH_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function Home() {
  const user = getUser();
  const [movieSearch, setMovieSearch] = useState("");
  const [movieQuery, setmovieQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [movieNominations, setMovieNominations] = useState([]);

  useEffect(() => {
    if (user !== null) {
      db.collection("users").where("ID", "==", user.ID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const newMovieNominations = [...movieNominations, ...doc.data().nominations];
          setMovieNominations(newMovieNominations);
          var userRef = db.collection("users").doc(user.ID);
          await userRef.set({ID: user.ID});
          userRef.update({
            nominations: [...newMovieNominations]
          });
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
    setMovieSearch("");
  }, [user && user.ID]);

  async function searchMovie(e) {
    e.preventDefault();
    if (movieSearch === "") {
      return;
    }
    await fetch(
      `http://www.omdbapi.com/?s=${movieSearch}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((movies) => {
        if (movies.Error) {
          setMovieResults([]);  
          return;
        }
        setMovieResults(movies.Search);
      });
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
      {movieNominations.length > 4 && (
        <div className="success-banner">
          <h1>{movieNominations.length} NOMINATIONS RECEIVED!</h1>
        </div>
      )}
      <div className="movie-columns">
        <div className="movie-results">
          {movieQuery !== "" ? (
            <h3>Movie query of "{movieQuery}"</h3>
          ) : (
            <h3>Movie query</h3>
          )}
          <hr />
          {movieResults.map((movie, i) => {
            return MovieResult(movie, i, user, movieNominations, setMovieNominations);
          })}
        </div>
        <div className="movie-nominations">
          <h3>Nominations</h3>
          <hr />
          {movieNominations.map((movie, i) => {
            return MovieNomination(
              movie,
              i,
              user,
              movieNominations,
              setMovieNominations
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
