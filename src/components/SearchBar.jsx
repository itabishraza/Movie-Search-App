import React from "react";
import SearchIcon from "../assets/search.svg";

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="search">
            <input
                placeholder="Search for movies"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
            />
            <img src={SearchIcon} alt="search" onClick={onSearch} />
        </div>
    );
};

export default SearchBar;
