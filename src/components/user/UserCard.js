import React from "react";

const UserCard = ({ id, user }) => {
  return (
    <div className=" user-card">
      <div className="flex-1" style={{ padding: "20px" }}>
        <div className="user-img">
          <img src={user?.image} loading="lazy" />
        </div>

        <div>
          <h2 className="user-name">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="user-info">{user?.email}</p>
          <p className="user-info">{user?.age}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
