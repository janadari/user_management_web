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

function Users() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // sort default by name
  const [sortBy, setSortBy] = useState("firstName");
  // default is descending order
  const [order, setOrder] = useState("asc");

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
    setFilteredList(updatedList);
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

  async function saveUser(e) {
    e.preventDefault();

    setUsersList([
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        id: Date.now(),
      },
      ...usersList,
    ]);
    setOpenModal(false);
    clearForm();

    setNotificationMessage("User added successfully!");
    setNotificationOpen(true);
  }

  function clearForm() {
    setFirstName("");
    setLastName("");
    setAge("");
    setEmail("");
  }

  function searchUsers(searchTerm) {
    console.log("search terms", searchTerm);
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

            {filteredList?.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user)}
              />
            ))}

            <div className="fab">
              <Tooltip title="Add New User">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </>
        )}

        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <form onSubmit={saveUser} className="flex-row-container">
              <Typography
                className="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Add A New User
              </Typography>
              <div className="input-box">
                <TextField
                  fullWidth
                  label="FirstName"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input-box">
                <TextField
                  fullWidth
                  label="LastName"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <TextField
                  fullWidth
                  type="number"
                  label="Age"
                  variant="outlined"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="modal-btn">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
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
