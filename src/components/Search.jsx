import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <form style={{ marginBottom: '25px'}} onSubmit={handleSearch}>
      <input
        placeholder='🔍︎'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit">Пошук</button>
    </form>
  );
}

export default Search;
