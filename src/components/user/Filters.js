import React, { useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const Filters = ({ setSortBy, setOrder }) => {
  const [sortTypes, setSortTypes] = useState("firstName");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortTypes(event.target.value);
    setSortBy(event.target.value);
  };

  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    setOrder(sortOrder);
  }, [sortOrder]);

  return (
    <div className="filter-options">
      <div className="search-box flex-1">
        <div className="flex-right flex-1">
          <InputLabel className="sort-by">Sort By </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="name"
            value={sortTypes}
            onChange={handleChange}
            style={{ minWidth: "100px" }}
          >
            <MenuItem value={"firstName"}>first name</MenuItem>
            <MenuItem value={"lastName"}>last name</MenuItem>
            <MenuItem value={"age"}>age</MenuItem>
          </Select>

          <Tooltip
            title={sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          >
            <IconButton onClick={toggleSortOrder} className="sort-btn">
              {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Filters;
