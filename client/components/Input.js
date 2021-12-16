import React from 'react';

const Input = ({ label, name, type, onChange }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={label}
        aria-label={label}
        id={name}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
