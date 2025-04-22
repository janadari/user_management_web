import React from "react";
import noResultsImg from "../images/no-results.png";

function NotFound() {
  return (
    <div className="flex-container">
      <img className="empty-state" src={noResultsImg} alt="No users found" />

      <h1>404 - Not Found</h1>
    </div>
  );
}

export default NotFound;
