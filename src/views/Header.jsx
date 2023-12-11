import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { auth, isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  {
    isLoggedIn()
      ? console.log("user is logged in")
      : console.log("user is not logged in");
  }

  {
    auth?.admin
      ? console.log("user is an admin")
      : console.log("user is not an admin");
  }

  return (
    <header className="py-4 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/home"
            id="main-logo"
            className="main-title hover:border-b-4 hover.border-red-500"
          >
            The Pizza Place
          </Link>
        </div>
        <div>
          {auth?.admin ? (
            <Link to="/admin" id="admin" className="hover:font-bold hover:underline">
              Admin
            </Link>
          ) : null}
        </div>
        <div className="flex items-center space-x-4">
          {/* Hamburger menu button */}
          <button className="text-2xl" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Hamburger menu */}
          <nav
            className={`${
              isMenuOpen ? "" : "hidden"
            } absolute top-16 right-2 lg:right-4 mt-2 mr-2 bg-white p-2 border rounded shadow-md`}
          >
            <ul className="space-y-2">
              <li>
                <Link to="/home" id="home" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" id="menu" onClick={toggleMenu}>
                  Menu
                </Link>
              </li>
              {isLoggedIn() ? (
                <li>
                  <Link to="/user-profile" id="profile" onClick={toggleMenu}>
                    Profile
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" id="login" onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
              )}
              
              <li>
                <Link to="/cart" id="cart" onClick={toggleMenu}>
                  
                  Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
