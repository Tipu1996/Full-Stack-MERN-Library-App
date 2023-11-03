import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { addBook } from "redux/books";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { getUsers } from "redux/users";
import { RootState } from "redux/configureStore";
import { User } from "types";

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const [showUsers, setShowUsers] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    description: "",
    publisher: "",
    authors: [],
    categories: [],
    status: "available",
    borrower: null,
    publishDate: {
      type: Date,
      required: true,
    },
    borrowDate: null,
    returnDate: null,
  });

  useEffect(() => {
    setAllUsers(state.users.list);
  }, [showUsers, allUsers, state.users.list]);

  const handleChange = (event: any) => {
    let { name, value } = event.target;
    if (name === "publishDate") {
      value = new Date(Date.parse(value));
    } else if (name === "categories" || name === "authors") {
      value = value.split(", ");
    }
    setBook((prevState) => ({ ...prevState, [name]: value }));
  };

  const addClick = () => {
    dispatch(
      addBook({
        searchBy: "addBook",
        url: `http://localhost:4000/api/v1/books/addbook`,
        bookToAdd: book,
      })
    );
  };

  const getUsersClick = () => {
    const token = localStorage.getItem("jwtToken");
    setShowUsers(showUsers ? false : true);
    dispatch(
      getUsers({
        jwtToken: token,
        url: "http://localhost:4000/api/v1/users/",
      })
    );
  };

  return (
    <>
      <Box textAlign="center">
        <Button
          variant="outlined"
          type="button"
          style={{ color: "white" }}
          sx={{ p: "7px", m: "10px 0 10px 0" }}
          aria-label="search"
          onClick={() => getUsersClick()}
        >
          Get All Registered Users
          {!showUsers ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Button>
      </Box>
      {showUsers ? (
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          pt="20px"
          pb={"20px"}
        >
          <TableContainer sx={{ maxHeight: "100%", width: "90%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Borrowed Books</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell align={"left"}>{user.firstName}</TableCell>
                    <TableCell align={"left"}>{user.email}</TableCell>
                    <TableCell align={"left"}>
                      {JSON.stringify(user.borrowedBooks)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <Button
          variant="outlined"
          type="button"
          style={{ color: "white" }}
          sx={{ p: "7px" }}
          aria-label="search"
          onClick={() => setShowForm(showForm ? false : true)}
        >
          Add New Book
          {!showForm ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Button>
      </Box>
      {showForm ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Title"
            name="title"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="ISBN"
            name="isbn"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Description"
            name="description"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Publisher"
            name="publisher"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Authors"
            name="authors"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Categories"
            name="categories"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <TextField
            sx={{
              width: "60%",
              display: "flex",
            }}
            placeholder="Publish Date: yyyy,mm,dd (no spaces)"
            name="publishDate"
            inputProps={{ "aria-label": "search books" }}
            onChange={(event) => {
              handleChange(event);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          />
          <Box mt={"15px"}>
            <Button
              variant="text"
              size="small"
              style={{ textDecoration: "none" }}
              onClick={() => {
                addClick();
              }}
            >
              Add To Library
              <IconButton type="button" sx={{ p: "7px" }} aria-label="search">
                <DriveFolderUploadIcon fontSize="medium" />
              </IconButton>
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Admin;
