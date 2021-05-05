import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Shopify from "../images/shopify.png";

export default function Layout(props) {
  const { user } = props;

  return (
    <React.Fragment>
      <div className="header-bg">
        <Container>
          <div id="header">
            <div id="brand">
              <h1 style={{ margin: "0 auto" }}>
                <img src={Shopify} style={{ height: "30px", width: "30px" }} alt="" />{" "}
                THE SHOPPIES
              </h1>
              <div>PRESENTED BY VINCENT TIEU</div>
            </div>
            {user != null ? (
              <div id="logout-area">
                <div style={{ marginRight: "10px" }}>Hi, {user.fullName}!</div>
                <Button onClick={user.signOut} variant="contained">
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <div />
                <div id="login-button" />
              </div>
            )}
          </div>
        </Container>
      </div>
      <Container>{props.children}</Container>
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
    </React.Fragment>
  );
}
