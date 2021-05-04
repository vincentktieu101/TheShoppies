import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export default function Layout(props) {
  const { user } = props;

  return (
    <Container>
      <div id="header">
        <div className="brand">
          <h1 style={{ marginBottom: "0" }}>THE SHOPPIES</h1>
          <b>PRESENTED BY VINCENT TIEU</b>
        </div>
        {!user ? (
          <div id="login-button" />
        ) : (
          <div id="logout-area">
            <div style={{marginBottom: "2px"}}>Hi, {user.fullName}!</div>
            <Button
              onClick={user.signOut}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
      {props.children}
      <div id="footer">
        I really enjoyed making this! Check out my source code{" "}
        <a
          href="https://github.com/vincentktieu101/TheShoppies"
          blank="_target"
        >
          here
        </a>
        .
      </div>
    </Container>
  );
}
