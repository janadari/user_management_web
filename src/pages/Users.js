import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import UserCard from "../components/user/UserCard";
import { CircularProgress } from "@mui/material";
import SearchBar from "../components/user/SearchBar";
import Filters from "../components/user/Filters";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Notifications from "../components/Notification";
import ConfirmationModal from "components/ConfirmationModal";
import AddAndUpdateUserModal from "components/user/AddAndUpdateUserModal";
import noResultsImg from "../images/no-results.png";

function Users() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // sort default by name
  const [sortBy, setSortBy] = useState("firstName");
  // default is descending order
  const [order, setOrder] = useState("asc");
  // search term
  const [searchTerm, setSearchTerm] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [filteredList, setFilteredList] = useState([]);
  const bottomRef = useRef(null);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(
    "User added successfully!"
  );

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [mode, setMode] = useState("add");

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [userToUPdate, setUserToUPdate] = useState();
  useEffect(() => {
    async function fetchData() {
      await fetchUsersList();
    }
    fetchData();
  }, []);

  useEffect(() => {
    let updatedList = sortList(sortBy, order);

    if (searchTerm) {
      filterUsers(searchTerm);
    } else {
      setFilteredList(updatedList);
    }
  }, [usersList, sortBy, order]);

  function sortList(sortBy, order) {
    console.log("sortby", order, sortBy);

    return usersList.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

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

  async function saveUser(userData) {
    if (mode === "update") {
      updateUser(userData);
    } else {
      saveNewUser(userData);
    }
  }

  function saveNewUser(userData) {
    setUsersList([
      {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        age: userData?.age,
        id: Date.now(),
      },
      ...usersList,
    ]);
    setOpenModal(false);

    setNotificationMessage("User added successfully!");
    setNotificationOpen(true);
  }

  function updateUser(userData) {
    const updatedUsers = usersList.map((user) =>
      user.id === userToUPdate.id ? { ...user, ...userData } : user
    );
    setUsersList(updatedUsers);
    setOpenModal(false);

    setNotificationMessage("User updated successfully!");
    setNotificationOpen(true);
  }

  function searchUsers(searchTerm) {
    console.log("search terms", searchTerm);
    setSearchTerm(searchTerm);
    filterUsers(searchTerm);
  }

  function filterUsers(searchTerm) {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      let newUserList = usersList?.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

        return fullName.includes(term);
      });

      setFilteredList(newUserList);
    } else {
      setFilteredList(usersList);
    }
  }

  function clearSearch() {
    setFilteredList(usersList);
  }

  function onEdit(user) {
    console.log(user);
    setUserToUPdate(user);
    setMode("update");
    setOpenModal(true);
  }

  function onDelete(user) {
    setUserToUPdate(user);
    setOpenConfirmationModal(true);
  }

  function handleConfirm() {
    const updatedList = usersList.filter((item) => item !== userToUPdate);
    setUsersList(updatedList);

    setNotificationMessage("Successfully Deleted");
    setNotificationOpen(true);

    handleCOnfirmationModalClose();
  }

  function handleCOnfirmationModalClose() {
    setOpenConfirmationModal(false);
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
            <SearchBar searchUsers={searchUsers} clearSearch={clearSearch} />

            <Filters setSortBy={setSortBy} setOrder={setOrder} />

            {filteredList && filteredList.length > 0 ? (
              filteredList.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                />
              ))
            ) : (
              <div className="empty-state-container">
                <img
                  className="empty-state"
                  src={noResultsImg}
                  alt="No users found"
                />
                <p>No users found</p>
              </div>
            )}

            <div className="fab">
              <Tooltip title="Add New User">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    handleOpen();
                    setMode("add");
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </>
        )}
        <AddAndUpdateUserModal
          openModal={openModal}
          handleClose={handleClose}
          saveUser={saveUser}
          userData={userToUPdate}
          mode={mode}
        />
      </div>
      <div ref={bottomRef} />

      <Notifications
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
      />

      <ConfirmationModal
        open={openConfirmationModal}
        onClose={handleCOnfirmationModalClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to REMOVE this user?"
      />
    </div>
  );
}

export default Users;
