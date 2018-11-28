import React from 'react';
import './searchbox.css';


const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='searchbox'>
      <input
        type='search'
        placeholder='search notes'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;