import React from "react";
import defaultImg from "../../images/default-img.png";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserCard = React.memo(({ id, user, onDelete, onEdit }) => {
  return (
    <div className=" user-card">
      <div className="header-flex-container" style={{ padding: "20px" }}>
        <div className="user-img">
          <img
            src={user?.image || defaultImg}
            loading="lazy"
            className="user-icon"
          />
        </div>

        <div>
          <h2 className="user-name">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="user-info">Email : {user?.email}</p>

          <p className="user-info">Age : {user?.age}</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
      >
        <Tooltip title="edit">
          <IconButton aria-label="edit" onClick={onEdit}>
            <EditIcon className="card-icon" />
          </IconButton>
        </Tooltip>

        <Tooltip title="delete">
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon className="card-icon" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

export default UserCard;
