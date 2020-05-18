import React from 'react';

import './Button.scss';

const Button = (props) => {
  return (
    <button class='btn-hover'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='22'
        height='22'
        viewBox='0 0 172 172'
      >
        <g
          fill='none'
          fill-rule='nonzero'
          stroke='none'
          stroke-width='1'
          stroke-linecap='butt'
          stroke-linejoin='miter'
          stroke-miterlimit='10'
          stroke-dasharray=''
          stroke-dashoffset='0'
          font-family='none'
          font-weight='none'
          font-size='none'
          text-anchor='none'
        >
          <path d='M0,172v-172h172v172z' fill='none'></path>
          <g fill='#ffffff'>
            <path d='M86,14.33333c-39.517,0 -71.66667,32.14967 -71.66667,71.66667c0,39.517 32.14967,71.66667 71.66667,71.66667c39.517,0 71.66667,-32.14967 71.66667,-71.66667c0,-39.517 -32.14967,-71.66667 -71.66667,-71.66667zM86,28.66667c31.61217,0 57.33333,25.72117 57.33333,57.33333c0,31.61217 -25.72117,57.33333 -57.33333,57.33333c-31.61217,0 -57.33333,-25.72117 -57.33333,-57.33333c0,-31.61217 25.72117,-57.33333 57.33333,-57.33333zM78.83333,57.33333v21.5h-21.5v14.33333h21.5v21.5h14.33333v-21.5h21.5v-14.33333h-21.5v-21.5z'></path>
          </g>
        </g>
      </svg>
      <span>Add Photo</span>
    </button>
  );
};

export default Button;
