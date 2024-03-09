import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../redux/Store";

const Header = () => {
  const state = useSelector((state) => state);
  console.log("Current User:",state);

  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3 gap-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              {/* <img
                className="background-image: none w-15 h-15 rounded-full  p-3"
                src="public\chinar.jpeg"
              /> */}
              <span className="text-slate-800">Vi$it</span>
              <span className="text-orange-400">Ka$hmir</span>
            </h1>
          </Link>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-800 hover:text-green-500">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-800 hover:text-green-500">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              {state ? (
                <img src={state.avatar} />
              ) : (
                <li className="text-slate-800 hover:text-green-500">SignIn</li>
              )}
            
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
