import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { setCurrentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await authService.signup(formData);
      setCurrentUser(user);
      navigate('/', { replace: true });
      e.target.reset();
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setError(err.response.data);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>

        <Input
          type="text"
          name="user_name"
          label="User name"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="first_name"
          label="First name"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="last_name"
          label="Last name"
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />

        <button>Sign up</button>

        {success && <div>Signed up!</div>}
        {error && <div>{error}</div>}
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default Signup;
