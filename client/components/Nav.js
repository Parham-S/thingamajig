import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

/**
 * The navbar gets should display, no matter if the user is logged in or out.
 *  - If the user is logged in, show the logged in user's metadata.
 *  - if the user isn't logged in, give a generic message with instructions.
 */
const Nav = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Demo App
        </Link>
      </span>
      {currentUser ? (
        <ul className="list">
          <li className="listItem">
            Welcome, {currentUser.first_name || currentUser.user_name}!
          </li>
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list">
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard (login required)
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="login">
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
