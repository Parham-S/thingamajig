import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useSignUpUser from '../hooks/useSignUpUser';

import Input from '../components/Input';

const Signup = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = useSignUpUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser.mutate(formData, {
      onError: (_error, _variables, _context) => {
        // e.target.reset();
      },
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    });
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

        {registerUser.isSuccess && <div>Signed up!</div>}
        {registerUser.isError && <div>{registerUser.error.message}</div>}
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default Signup;
