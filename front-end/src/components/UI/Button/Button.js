import React from 'react';

import './Button.scss';

const Button = (props) => {
  return (
    <button
      className={`btn ${props.type} ${props.primary && 'btn--primary'} ${
        props.secondary && 'btn--secondary'
      } ${props.google && 'btn--google'} ${
        props.disabled === true && 'btn--disabled'
      }`}
    >
      {props.children}
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
