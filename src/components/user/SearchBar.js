import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = ({ searchUsers, clearSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const handler = setTimeout(() => {
        setDebouncedTerm(searchTerm);
      }, 500); // debounce in 500ms

      return () => {
        clearTimeout(handler);
      };
    } else {
      clearSearch();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      searchUsers(debouncedTerm);
    }
  }, [debouncedTerm]);

  function clearSearchTerm() {
    setSearchTerm("");
    clearSearch();
  }
  return (
    <div className="filter-options">
      <div className="search-box search-flex">
        <div className="flex-right flex-1">
          <InputBase
            style={{
              width: "400px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Tooltip title="clear search term">
            <IconButton aria-label="clear" onClick={clearSearchTerm}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
