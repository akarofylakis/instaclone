import React from 'react';

import './Avatar.scss';

const Avatar = ({ size, source }) => {
  return (
    <div
      className='avatar-container'
      style={{
        width: size + 4,
        height: size + 4,
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
