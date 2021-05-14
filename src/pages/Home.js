import React, { useEffect, useState } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import getUser from "../utils/get-user.js";
import { checkOpenBanner, checkCloseBanner } from "../utils/check-banner.js"
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

export default function Home() {
  const user = getUser();
  const [movieSearch, setMovieSearch] = useState("");
  const [movieQuery, setmovieQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [movieNominations, setMovieNominations] = useState([]);

  useEffect(() => {
    if (user !== null) {
      const db = firebase.firestore();
      db.collection("users")
        .where("ID", "==", user.ID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (!doc.data() || !doc.data().nominations) {
              return;
            }
            const newMovieNominations = [
              ...movieNominations,
              ...doc.data().nominations,
            ];
            setMovieNominations(newMovieNominations);
            const userRef = db.collection("users").doc(user.ID);
            await userRef.set({ ID: user.ID });
            userRef.update({
              nominations: [...newMovieNominations],
            });
            checkOpenBanner(newMovieNominations);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    setMovieSearch("");
  }, [user && user.ID]);

  async function nominateMovie(movie) {
    const newMovieNominations = [...movieNominations];
    newMovieNominations.push(movie);
    setMovieNominations(newMovieNominations);
    if (user !== null) {
      const db = firebase.firestore();
      const userRef = db.collection("users").doc(user.ID);
      await userRef.set({ ID: user.ID });
      userRef.update({
        nominations: newMovieNominations,
      });
    }
    checkOpenBanner(newMovieNominations.length);
  }

  async function unnominateMovie(movie) {
    const newMovieNominations = [...movieNominations];
    newMovieNominations.splice(newMovieNominations.indexOf(movie), 1);
    setMovieNominations([...newMovieNominations]);
    if (user !== null) {
      const db = firebase.firestore();
      const userRef = db.collection("users").doc(user.ID);
      await userRef.set({ ID: user.ID });
      userRef.update({
        nominations: [...newMovieNominations],
      });
    }
    checkCloseBanner(newMovieNominations.length);
  }

  async function searchMovie(e) {
    e.preventDefault();
    if (movieSearch === "") {
      return;
    }
    await fetch(
      `https://www.omdbapi.com/?s=${movieSearch}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
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
      <div id="success-banner">
        <h1>{movieNominations.length} NOMINATIONS RECEIVED!</h1>
      </div>
      <div className="movie-columns">
        <div className="movie-results">
          <h3>Movie query {movieQuery != "" && `of "${movieQuery}"`}</h3>
          <hr />
          {movieResults.map((movie, i) => {
            return (
              <MovieResult
                key={i}
                movie={movie}
                movieNominations={movieNominations}
                nominateMovie={nominateMovie}
              />
            );
          })}
        </div>
        <div className="movie-nominations">
          <h3>Nominations</h3>
          <hr />
          {movieNominations.map((movie, i) => {
            return (
              <MovieNomination
                key={i}
                movie={movie}
                unnominateMovie={unnominateMovie}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
