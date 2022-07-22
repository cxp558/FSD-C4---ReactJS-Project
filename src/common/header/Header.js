import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "./Header.css";

function Header(props) {
  const { showBookShow } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBookShow = () => {
    if (isLoggedIn) {
      // go to book show page
      props.history.push("/bookshow/2");
    } else {
      alert("login first");
    }
  };

  return (
    <AppBar className="header">
      <Toolbar className="toolbar">
        <img
          src={require("../../assets/logo.svg")}
          className="logo"
          alt="no image"
        />

        <div className="btns_container">
          {showBookShow && (
            <Button
              onClick={handleBookShow}
              size="small"
              color="primary"
              variant="contained"
            >
              Book Show
            </Button>
          )}
          {isLoggedIn ? (
            <Button
              style={{ display: isLoggedIn ? "inline-block" : "none" }}
              size="small"
              variant="contained"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          ) : (
            <Button
              style={{ display: isLoggedIn ? "none" : "inline-block" }}
              size="small"
              variant="contained"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </Button>
          )}
          {!isLoggedIn && !showBookShow && (
            <Button
              style={{ display: isLoggedIn ? "none" : "inline-block" }}
              size="small"
              variant="contained"
              // onClick={() => setIsLoggedIn(true)}
            >
              Register
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
