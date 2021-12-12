import React from 'react';

const Input = ({ label, name, type, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} onChange={onChange} />
    </div>
  );
};

export default Input;
