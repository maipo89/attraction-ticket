'use client';

import React, { useState } from 'react';
import SearchIcon from "./icons/SearchIcon";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {

  // Set the query with useState
  const [query, setQuery] = useState('');

  // Handles the form submission and passes the query to the onSearch function
  const handleSearch = (e: React.FormEvent) => {

    e.preventDefault();

    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <form className="search-input" onSubmit={handleSearch}>

      {/* Search Icon */}
      <div className="search-input__icon">
          <SearchIcon />
      </div>

      {/* Input for the query */}
      <input 
        type="text" 
        placeholder="Search attractions and tickets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* Button to submit the query */}
      <button aria-label="Search for attractions" type="submit">Submit</button>
    </form>
  );
};

export default SearchInput;