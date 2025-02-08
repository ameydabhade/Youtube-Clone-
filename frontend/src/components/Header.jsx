import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, toggleSideBar } from "../redux/slices/configsSlice";
import UploadVideo from "./UploadVideo";
import { setSearchText } from "../redux/slices/filtersSlice";
import { useState } from "react";

function Header() {
  const auth = useSelector((state) => state.configs.auth);
  const { searchText } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center w-full md:w-auto justify-between">
        <div className="flex items-center">
          {location.pathname === "/" && (
            <button
              className="mr-4 text-gray-600 hover:text-gray-800"
              onClick={() => dispatch(toggleSideBar(""))}
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          )}
          <Link to="/" className="flex items-center">
            <img
              className="h-6 md:h-8 w-auto mr-2"
              src="https://cdn.pixabay.com/photo/2016/11/19/03/08/youtube-1837872_1280.png"
              alt="logo"
            />
            <h1 className="text-lg md:text-xl font-bold">
              Youtube
            </h1>
          </Link>
        </div>

        {/* Mobile search toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Search bar - responsive */}
      <div
        className={`${
          showSearch ? "flex" : "hidden"
        } md:flex items-center w-full md:w-auto md:flex-1 max-w-2xl mx-0 md:mx-8 mt-3 md:mt-0`}
      >
        <div className="relative flex items-center w-full">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Search"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 text-gray-400"
          />
        </div>
      </div>

      {/* Auth section - responsive */}
      <div className="flex items-center mt-3 md:mt-0">
        {auth.name ? (
          <div className="flex items-center space-x-2 md:space-x-4">
            <UploadVideo />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                {auth.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {auth.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 md:px-6 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
