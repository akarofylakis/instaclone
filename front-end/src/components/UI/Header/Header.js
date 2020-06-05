import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { searchUsersAsync } from "../../../redux/users/user-actions";

import Input from "../Input/Input";
import Button from "../Button/Button";
import Backdrop from "../../shared/Backdrop/Backdrop";
import AddModal from "../../shared/AddModal/AddModal";
import AddIcon from "../../../img/icons/Add";
import SearchIcon from "../../../img/icons/Search";

import "./Header.scss";

const Header = ({ searchUsers }) => {
  const [searchString, setSearchString] = useState("");
  const [modalStatus, toggleModal] = useState(false);

  const handleSubmit = async (e) => {
    searchUsers(searchString);
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setSearchString(value);
  };

  const modalOpener = () => {
    toggleModal(true);
  };

  const modalCloser = () => {
    toggleModal(false);
  };

  const modalToggle = (e) => {
    if (e.target.className) {
      if (e.target.localName === "path" || e.target.localName === "svg") {
        return toggleModal((prevState) => !prevState);
      } else if (
        e.target.className.includes("backdrop") ||
        e.target.className.includes("modal-close")
      ) {
        toggleModal((prevState) => !prevState);
      }
    }
  };

  return (
    <header>
      <Backdrop onClick={modalToggle} show={modalStatus}>
        <AddModal forceCloseModal={modalCloser} toggleModal={modalToggle} />
      </Backdrop>

      <div className="inner-container">
        <div className="input-container">
          <Input
            name="search"
            onChange={changeHandler}
            value={searchString}
            type="search"
            placeholder="Who are you looking for?"
          />
          <Link to="/search">
            <button className="search-btn" onClick={handleSubmit}>
              <SearchIcon />
            </button>
          </Link>
        </div>

        <div className="header__right-section-container">
          <ul className="right-section--container">
            {/* <li>
              <Link to='/messages'>
                <img
                  alt='notifications'
                  src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS44MDMgNTExLjgwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjgwMyA1MTEuODAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTEwLjk4MSwyNi40MTdjLTAuMDMyLTAuMDk2LTAuMDMyLTAuMjI0LTAuMDY0LTAuMzUyYy0wLjc2OC0xLjk1Mi0xLjg4OC0zLjgwOC0zLjQ1Ni01LjQwOCAgICBjLTAuMjg4LTAuMjg4LTAuNjQtMC4zODQtMC45MjgtMC42NGMtMC4yMjQtMC4xOTItMC4yNTYtMC40OC0wLjQ4LTAuNjcyYy0wLjQxNi0wLjMyLTAuOTI4LTAuMzItMS4zNzYtMC42MDggICAgYy0xLjYtMS4wNTYtMy4yNjQtMS43OTItNS4wNTYtMi4yMDhjLTAuNzA0LTAuMTYtMS4zNDQtMC4zNTItMi4wOC0wLjQxNmMtMi41MjgtMC4yNTYtNS4wODgtMC4wNjQtNy40ODgsMC44OTZsLTQ4MCwxOTEuOTY4ICAgIGMtNS45MiwyLjMzNi05Ljg4OCw4LTEwLjA0OCwxNC40Yy0wLjE2LDYuNCwzLjQ4OCwxMi4yNTYsOS4zMTIsMTQuOTQ0bDE4Mi42ODgsODQuMzJ2MTU3LjE1MmMwLDcuMTY4LDQuNzY4LDEzLjQ3MiwxMS42NDgsMTUuMzkyICAgIGMxLjQ0LDAuNDE2LDIuOTEyLDAuNjA4LDQuMzUyLDAuNjA4YzUuNDcyLDAsMTAuNjU2LTIuODE2LDEzLjYzMi03LjYxNmw3Mi41NzYtMTE4LjMzNmwxMzEuMTA0LDYwLjUxMiAgICBjMi4xMTIsMC45MjgsNC40MTYsMS40NCw2LjY4OCwxLjQ0YzIuNTkyLDAsNS4xNTItMC42NCw3LjQ4OC0xLjg1NmM0LjQxNi0yLjMzNiw3LjQ4OC02LjU5Miw4LjI4OC0xMS41Mmw2NC0zODMuOTY4ICAgIGMwLjA2NC0wLjMyLTAuMTI4LTAuNjA4LTAuMDk2LTAuOTI4QzUxMS45NDEsMzEuMTIxLDUxMS44MTMsMjguNzIxLDUxMC45ODEsMjYuNDE3eiBNMjA0LjcwOSwyOTMuMjY1TDU2LjQ1MywyMjQuODQ5ICAgIEw0MjcuMDc3LDc2LjYyNUwyMDQuNzA5LDI5My4yNjV6IE0yMjQuMDA1LDQyMy4xMjF2LTg1LjY5Nmw0MC45MjgsMTguOTEyTDIyNC4wMDUsNDIzLjEyMXogTTQxOS42ODUsMzkyLjQ2NWwtMTgzLjg0LTg0LjgzMiAgICBMNDcyLjE5Nyw3Ny4zNjFMNDE5LjY4NSwzOTIuNDY1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='
                />
              </Link>
            </li> */}
            <li>
              <Button onClick={modalOpener} primary text="Upload">
                <AddIcon />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (searchString) => dispatch(searchUsersAsync(searchString)),
});

export default connect(null, mapDispatchToProps)(Header);
