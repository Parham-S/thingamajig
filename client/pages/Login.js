import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import useSignInUser from '../hooks/useSignInUser';
import Input from '../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const githubLogin = (e) => {
    e.preventDefault();

    // NOTE: you HAVE to call the BACKEND URL explicitly
    // because navigate will only check the possible routes
    window.location.href = `http://localhost:3000/auth/github/?from=${from}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = useSignInUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser.mutate(formData, {
      onSuccess: () => {
        console.log('gets here?');
        navigate(from, { replace: true });
      },
      onError: (_error, _variables, _context) => {
        e.target.reset();
      },
    });
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
          {loginUser.isError && (
            <div className="err">ERROR: {loginUser.error.message}</div>
          )}
          <p>
            Need an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </article>
  );
};

export default Login;
