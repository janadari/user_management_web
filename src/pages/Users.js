import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import UserCard from "../components/user/UserCard";
import { CircularProgress } from "@mui/material";
import SearchBar from "../components/user/SearchBar";
import Filters from "../components/user/Filters";

function Users() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await fetchUsersList();
    }
    fetchData();
  }, []);

  async function fetchUsersList() {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/users");
      const json = await res.json();
      setUsersList(json?.users);
    } catch (e) {
      console.log("error fetching data", e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="user-container">
      <div className="user-list">
        {loading ? (
          <div className="flex-container">
            <CircularProgress color="white" />
          </div>
        ) : (
          <>
            <SearchBar />

            <Filters />

            {usersList?.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
