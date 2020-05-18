import React from 'react';

import './SearchInput.scss';

const SearchInput = (props) => {
  return (
    <div className='tb'>
      <div className='td'>
        <input type='text' placeholder='Search' required />
      </div>
      <div className='td' id='s-cover'>
        <button type='submit'>
          <div id='s-circle'></div>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
