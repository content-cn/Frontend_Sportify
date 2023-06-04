import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/reducers/authReducer";
import { logout } from "../../../redux/reducers/authReducer";
//Icons..
import HomeIcon from "../../../assets/images/home.png";
import SignIn from "../../../assets/images/Log in.png";
import Logout from "../../../assets/images/Log Out.png";
import { FcSportsMode } from "react-icons/fc";
import { BsStar } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isAuthenticated = user;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to logout from app
  const onLogoutHandler = () => {
    scrollTop();
    dispatch(logout()); // inbuilt firebase function to logout
  };

  return (
    <nav
      className="navbar"
      style={{
        justifyContent: "space-evenly",
        boxShadow: "rgb(17 17 26 / 5%) 0px 15px 20px",
      }}
    >
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => {}}>
          Sportify <FcSportsMode size={30} />
        </NavLink>
        <ul
          className={click ? "nav-menu active" : "nav-menu"}
          onClick={scrollTop}
        >
          <li className="nav-item active">
            <NavLink
              activeclassname="active-links"
              to="/"
              className="nav-links"
              exact="true"
            >
              <span>
                <img
                  className="icon_styles"
                  src={HomeIcon}
                  alt="Home"
                  onClick={scrollTop}
                />
              </span>{" "}
              Home
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item active">
                <NavLink
                  activeclassname="active-links"
                  to="/favorites"
                  className="nav-links"
                >
                  <span>
                    <BsStar size={25} style={{ marginRight: "5px" }} />{" "}
                  </span>
                  Favorites
                </NavLink>
              </li>
            </>
          )}

          <li className="nav-item active">
            <NavLink
              activeclassname="active-links"
              to="/search"
              className="nav-links"
            >
              <span>
                <FaSearch size={25} style={{ marginRight: "5px" }} />{" "}
              </span>
              Players
            </NavLink>
          </li>

          <li className="nav-item active">
            {isAuthenticated ? (
              <NavLink
                to="/"
                onClick={onLogoutHandler}
                activeclassname="active-links"
                className="nav-links"
              >
                <span>
                  <img className="icon_styles" src={Logout} alt="Home" />
                </span>
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  activeclassname="active-links"
                  to="/signin"
                  className="nav-links"
                >
                  <span>
                    <img
                      className="icon_styles"
                      src={SignIn}
                      alt="Home"
                      onClick={scrollTop}
                    />
                  </span>
                  SignIn
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
