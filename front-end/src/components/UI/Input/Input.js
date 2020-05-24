import React from 'react';

import './Input.scss';

const Input = ({ onChange, ...otherProps }) => {
  return (
    <div
      className={`input-container ${
        otherProps.type === 'textarea' && 'input-container-textarea'
      }`}
    >
      {otherProps.type === 'textarea' ? (
        <textarea onChange={onChange} {...otherProps}></textarea>
      ) : (
        <input onChange={onChange} {...otherProps} />
      )}
    </div>
  );
};

export default Input;
