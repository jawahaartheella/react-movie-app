import React from "react";

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search" />

        <input 
          type="text" 
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
};

export default Search;

// We should never change state directly inside a child component. like so searchTerm = "new term";
// Instead, we can pass state and state updater functions as props to child components.