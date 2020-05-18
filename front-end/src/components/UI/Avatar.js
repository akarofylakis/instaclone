import React from 'react';

import './Avatar.scss';

const Avatar = ({ size, source }) => {
  return (
    <div
      className='avatar-container'
      style={{
        width: size + 6,
        height: size + 6,
      }}
    >
      <div
        className='avatar'
        style={{
          backgroundImage: `url(${source})`,
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
};

export default Avatar;
