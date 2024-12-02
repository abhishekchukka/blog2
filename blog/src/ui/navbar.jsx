// src/ui/navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext";

const Navbar = () => {
  const nav = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-stone-100 py-4 px-8 shadow-black shadow-sm flex justify-between items-center">
      <h1
        className="text-3xl cursor-pointer font-bold rounded"
        onClick={() => nav("/home")}
      >
        Blog App
      </h1>
      <div className="flex items-center relative hidden sm:flex">
        <input
          type="text"
          placeholder="Search"
          className="text-xl pl-1 border-none focus:outline-none rounded-lg transition-all duration-300 w-80 hover:w-96 focus:w-96"
        />
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1em"
          width="1em"
          className="text-xl rounded bg-white absolute right-1"
        >
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
      </div>
      <ul className="flex items-center space-x-5">
        {!isAuthenticated ? (
          <>
            <li className="font-semibold text-2xl hover:shadow-lg transition-all hover:duration-1000 p-2 rounded transition-colors hover:bg-slate-50">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="font-semibold text-2xl hover:shadow-lg transition-all hover:duration-1000 p-2 rounded transition-colors hover:bg-slate-50">
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li className="font-semibold text-2xl hover:shadow-lg transition-all hover:duration-1000 p-2 rounded transition-colors hover:bg-slate-50">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              onClick={() => {
                logout();
              }}
              className="font-semibold text-2xl hover:shadow-lg transition-all cursor-pointer hover:duration-1000 p-2 rounded transition-colors hover:bg-slate-50"
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
