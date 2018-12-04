import React from 'react';
import FieldText from '@atlaskit/field-text';
import './searchbox.css';


const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='searchbox'>
      {/* <input
        type='search'
        placeholder='search notes'
        onChange={searchChange}
      /> */}
      <FieldText type="search" name="search" placeholder="Search..." 
								shouldFitContainer
								onChange={searchChange}/>
    </div>
  );
}

export default SearchBox;