import React from 'react';

import './Input.scss';

const Input = ({ type, name, placeholder }) => {
  return (
    <div
      className={`input-container ${
        type === 'search' && 'input-container-search'
      } ${type === 'textarea' && 'input-container-textarea'}`}
    >
      {type === 'textarea' ? (
        <textarea type={type} name={name} placeholder={placeholder}></textarea>
      ) : (
        <input type={type} name={name} placeholder={placeholder} />
      )}
    </div>
  );
};

export default Input;
