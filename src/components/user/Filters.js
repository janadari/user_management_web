import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const Filters = () => {
  const [age, setAge] = React.useState("name");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    // Implement sorting logic here based on the sortOrder
    console.log(
      sortOrder === "asc"
        ? "Sorted in ascending order"
        : "Sorted in descending order"
    );
  };

  return (
    <div className="filter-options">
      <div className="search-box flex-1">
        <div className="flex-right flex-1">
          <InputLabel style={{ marginRight: "10px" }}>Sort By </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="name"
            onChange={handleChange}
          >
            <MenuItem value={"name"}>name</MenuItem>
            <MenuItem value={"age"}>age</MenuItem>
          </Select>

          <Tooltip
            title={sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          >
            <IconButton color="primary" onClick={toggleSortOrder}>
              {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Filters;
