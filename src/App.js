import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Private from "./pages/Private";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);
  }, [isSignedIn]);

  function initGoogleSignIn() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          setIsSignedIn(isSignedIn);

          authInstance.isSignedIn.listen((isSignedIn) => {
            setIsSignedIn(isSignedIn);
          });
        });
    });
    window.gapi.load("signin2", () => {
      window.gapi.signin2.render("login-button", {
        theme: "dark",
      });
    });
  }

  return <React.Fragment>{isSignedIn ? <Home /> : <Private />}</React.Fragment>;
}
