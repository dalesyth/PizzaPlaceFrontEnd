import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/home" id="main-logo" className="text-xl font-semibold text-red-500 hover:border-b-4 hover:border-red-500">
            The Pizza Place
          </Link>
          <Link to="/menu" id="menu" className="hover:border-b-4 hover:border-red-500">
            Menu
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" id="login" className="hover:border-b-4 hover:border-red-500">
            Login
          </Link>
          <Link to="/cart" id="cart" className="flex items-center">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl hover:border-b-4 hover:border-red-500" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
