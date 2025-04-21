import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="filter-options">
      <div className="search-box flex-1">
        <div className="flex-right flex-1">
          <TextField
            label="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
