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

    // FIXME: you HAVE to call the BACKEND URL explicitly.
    // why isn't it working from proxy? literally no idea.
    window.location = `http://localhost:8080/auth/github/?from=${from}`;
    // navigate(`http://localhost:8080/auth/github/?from=${from}`, {
    //   replace: true,
    // });
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
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <button onClick={githubLogin}>Or login with GitHub</button>
      </form>
      {isError && <div className="err">ERROR!</div>}
      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
};

export default Login;
