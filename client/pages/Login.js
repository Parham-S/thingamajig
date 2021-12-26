import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { useMutation, useQueryClient } from 'react-query';
import authService from '../services/authService';
import Input from '../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);

  const queryClient = useQueryClient();
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

  const loginUser = useMutation((form) => authService.login(form), {
    onSuccess: (user) => {
      queryClient.setQueryData('CURRENT_USER', user.user);
      navigate(from, { replace: true });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser.mutate(formData, {
      onError: (_error, _variables, _context) => {
        e.target.reset();
      },
    });
  };

  return (
    <article>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='grid'>
        <div>
          <Input
            type='text'
            name='user_name'
            label='User name'
            onChange={handleChange}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
          <button className='secondary' onClick={githubLogin}>
            Or login with GitHub
          </button>
          {loginUser.isError && (
            <div className='err'>ERROR: {loginUser.error.message}</div>
          )}
          <p>
            Need an account? <Link to='/signup'>Sign up</Link>
          </p>
        </div>
      </form>
    </article>
  );
};

export default Login;
