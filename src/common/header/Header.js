import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import "./Header.css";
import {
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

const modalCustomStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Header(props) {
  const { showBookShow, history } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const baseUrl = "/api/v1/";

  useEffect(() => {
    if (sessionStorage.getItem("access-token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleBookShow = () => {
    if (isLoggedIn) {
      // go to book show page
      history.push("/bookshow/2");
    } else {
      openModal();
    }
  };

  const handleRegister = () => {
    const data = {
      email_address: email,
      first_name: fName,
      last_name: lName,
      mobile_number: number,
      password: password,
    };
    if (
      email.trim() &&
      fName.trim() &&
      lName.trim() &&
      number.trim() &&
      password.trim()
    ) {
      // signup
      fetch(baseUrl + "signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.id && response.status) {
            setMsg("Registration Successful. Please Login!"); // display message
          } else if (response.code == "USR-009") {
            setMsg("User email already exists");
          }
        });
    }
  };

  const handleLogin = () => {
    const data = {
      username: username,
      password: loginPassword,
    };
    // encode email:password with base64
    const token = Buffer.from(username + ":" + loginPassword).toString(
      "base64"
    );
    sessionStorage.setItem("access-token", token);

    // signin
    fetch(baseUrl + "auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Expose-Headers": "access-token",
        Authorization: "Basic " + sessionStorage.getItem("access-token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        sessionStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.id) {
          // close modal and go to home page
          closeModal();
          history.push("/");
          setIsLoggedIn(true); // set logged in to true
        }
        if (response.code == "USR-002" || response.code == "USR-003") {
          setLoginMsg(response.message);
        }
      });
  };

  const handleLogout = () => {
    // signin
    fetch(baseUrl + "auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + sessionStorage.getItem("access-token"),
      },
    }).then((response) => {
      if (response.ok) {
        sessionStorage.removeItem("access-token"); //delete token
        setIsLoggedIn(false); // set logged in to true
      }
    });
  };

  const checkField = (field) => {
    return (
      !field.trim() && (
        <FormHelperText>
          <span className="red">Required</span>
        </FormHelperText>
      )
    );
  };

  return (
    <React.Fragment>
      <div className="header">
        <img
          src={require("../../assets/logo.svg")}
          className="logo"
          alt="no image"
        />

        <div className="btns_container">
          {showBookShow && (
            <Button
              onClick={handleBookShow}
              color="primary"
              variant="contained"
            >
              Book Show
            </Button>
          )}
          {isLoggedIn ? (
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" onClick={openModal}>
              Login
            </Button>
          )}
          {!isLoggedIn && !showBookShow && (
            <Button variant="contained" onClick={openModal}>
              Register
            </Button>
          )}
        </div>
      </div>

      {/* login registration modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalCustomStyles}
      >
        <div>
          <Tabs
            value={value}
            indicatorColor="secondary"
            onChange={handleChange}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {value === 0 && (
            <div className="inputContainer">
              <FormControl required>
                <InputLabel htmlFor="email_login_input">Username</InputLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  id="email_login_input"
                />
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="password_login_input">Password</InputLabel>
                <Input
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type="password"
                  id="password_login_input"
                />
              </FormControl>
              {loginMsg && <Typography>{loginMsg}</Typography>}
              <Button onClick={handleLogin} color="primary" variant="contained">
                Login
              </Button>
            </div>
          )}
          {value === 1 && (
            <div className="inputContainer">
              <FormControl required>
                <InputLabel htmlFor="firstname_input">First Name</InputLabel>
                <Input
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  id="firstname_input"
                />
                {checkField(fName)}
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="lastname_input">Last Name</InputLabel>
                <Input
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  id="lastname_input"
                />
                {checkField(lName)}
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="email_register_input">Email</InputLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email_register_input"
                />
                {checkField(email)}
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="password_register_input">
                  Password
                </InputLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password_register_input"
                />
                {checkField(password)}
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="contact_register_input">
                  Contact No
                </InputLabel>
                <Input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  type="number"
                  id="contact_register_input"
                />
                {checkField(number)}
              </FormControl>
              {msg && <Typography>{msg}</Typography>}
              <Button
                onClick={handleRegister}
                color="primary"
                variant="contained"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default withRouter(Header);
