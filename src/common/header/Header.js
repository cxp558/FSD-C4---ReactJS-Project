import React, { useState } from "react";
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
  const [value, setValue] = React.useState(0);

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
            <Button variant="contained" onClick={handleBookShow}>
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
                <InputLabel htmlFor="email_login_input">Username *</InputLabel>
                <Input type="email" id="email_login_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="password_login_input">
                  Password *
                </InputLabel>
                <Input type="password" id="password_login_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <Button
                onClick={() => setIsLoggedIn(true)}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            </div>
          )}
          {value === 1 && (
            <div className="inputContainer">
              <FormControl required>
                <InputLabel htmlFor="firstname_input">First Name *</InputLabel>
                <Input id="firstname_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="lastname_input">Last Name *</InputLabel>
                <Input id="lastname_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="email_register_input">Email *</InputLabel>
                <Input type="email" id="email_register_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="password_register_input">
                  Password *
                </InputLabel>
                <Input type="password" id="password_register_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <FormControl required>
                <InputLabel htmlFor="contact_register_input">
                  Contact No *
                </InputLabel>
                <Input type="number" id="contact_register_input" />
                <FormHelperText>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
              <Button
                onClick={() => setIsLoggedIn(true)}
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
