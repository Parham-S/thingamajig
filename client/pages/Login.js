import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import authService from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [isError, setError] = useState(false);
  const { setCurrentUser } = useAuth();

  const from = location.state?.from?.pathname || '/';
  const githubLogin = (e) => {
    e.preventDefault();

    // NOTE: you HAVE to call the BACKEND URL explicitly
    // because navigate will only check the possible routes
    window.location = `http://localhost:3000/auth/github/?from=${from}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await authService.login(formData);
      setCurrentUser(user);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      e.target.reset();
    }
  };
  return (
    <article>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="grid">
        <div>
          <Input
            type="text"
            name="user_name"
            label="User name"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button className="secondary" onClick={githubLogin}>
            Or login with GitHub
          </button>
          {isError && <div className="err">ERROR!</div>}
          <p>
            Need an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </article>
  );
};

export default Login;
