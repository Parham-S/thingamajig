import React from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';

/**
 * The navbar gets should display, no matter if the user is logged in or out.
 *  - If the user is logged in, show the logged in user's metadata.
 *  - if the user isn't logged in, give a generic message with instructions.
 */
const Nav = () => {
  const { isLoading, isError, data: currentUser, error } = useCurrentUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <strong>
              <Link to="/">Demo App</Link>
            </strong>
          </li>
        </ul>

        {currentUser ? (
          <ul>
            <li>Welcome, {currentUser.first_name || currentUser.user_name}!</li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="dashboard">Dashboard (login required)</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Nav;
