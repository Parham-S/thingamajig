import React, { useState, useContext } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  // not a typo: we're just not using currentUser in this file
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/users/signup', formData);
      sessionStorage.setItem('token', res.data.token);
      setCurrentUser(res.data.user);
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
