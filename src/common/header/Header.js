import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "./Header.css";

function Header(props) {
  return (
    <AppBar className="header">
      <Toolbar className="toolbar">
        <img
          src={require("../../assets/logo.svg")}
          className="logo"
          alt="no image"
        />

        <div>
          <Button size="small" variant="contained">
            Login
          </Button>
          <Button size="small" variant="contained">
            Logout
          </Button>
          <Button size="small" color="primary" variant="contained">
            Book Show
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
