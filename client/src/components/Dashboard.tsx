import {
  Avatar,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/configureStore";
import { AppDispatch } from "redux/store";
import { getUser, getUsers } from "redux/users";
import { User } from "types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { getBooks, returnBook } from "redux/books";
import mongoose from "mongoose";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const [isAdmin] = useState(localStorage.getItem("isAdmin"));
  const [showUsers, setShowUsers] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken") || null;
    const userId = localStorage.getItem("userId") || null;
    if (token)
      dispatch(
        getBooks({
          jwtToken: token,
          searchBy: "getAll",
          url: "http://localhost:4000/api/v1/books/",
          bookToAdd: null,
        })
      );
    if (userId && token)
      dispatch(
        getUser({
          jwtToken: token,
          userId: JSON.parse(userId),
          url: `http://localhost:4000/api/v1/users`,
        })
      );
  }, [dispatch, state.users.jwtToken]);

  const user = state.users.user;
  const allBooks = state.books.list;

  const tempPic = localStorage.getItem("picture");

  const [pic, setPic] = useState("");

  useEffect(() => {
    if (tempPic) setPic(tempPic);
  }, [tempPic]);

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

  useEffect(() => {
    setAllUsers(state.users.list);
  }, [showUsers, allUsers, state.users.list]);

  function returning(bookId: mongoose.Schema.Types.ObjectId) {
    const user = localStorage.getItem("userId");
    dispatch(
      returnBook({
        url: "http://localhost:4000/api/v1/books/return",
        bookId,
        userId: user ? JSON.parse(user) : "",
      })
    );
  }

  return (
    <>
      {isAdmin === "true" ? (
        <Box textAlign="center">
          <Button
            variant="outlined"
            type="button"
            style={{ color: "white" }}
            sx={{ p: "7px", mt: "10px" }}
            aria-label="search"
            onClick={() => getUsersClick()}
          >
            Get All Registered Users (Admin Right)
            {!showUsers ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </Button>
        </Box>
      ) : null}
      {showUsers ? (
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
      ) : null}
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        m={"20px 0 10px 0"}
      >
        <Avatar
          alt={user?.firstName}
          src={pic}
          sx={{ mr: "10px", width: "60px", height: "60px" }}
        />
        <Typography
          align="center"
          variant="h5"
          sx={{ textDecoration: "underline" }}
        >
          Personal Profile
        </Typography>
      </Box>
      {user ? (
        <>
          <Box
            justifyContent="left"
            alignItems={"center"}
            m={"20px 0 10px 20px  "}
          >
            <Typography align="center" variant="body1">
              Name:{"\u00A0"}
              {user.firstName}
              {user.lastName}
            </Typography>
            <Typography align="center" variant="body1">
              Email:{"\u00A0"}
              {user.email}
            </Typography>
          </Box>
          {allBooks.map((book) =>
            user._id === book?.borrower?._id ? (
              <Grid key={book.isbn}>
                <Typography align="center" variant="body1">
                  Title:{"\u00A0"}
                  {book.title}
                </Typography>
                <Typography align="center" variant="body1">
                  Borrow Date:{"\u00A0"}
                  {JSON.stringify(book.borrowDate)}{" "}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => returning(book._id)}
                >
                  Return Book
                </Button>
              </Grid>
            ) : null
          )}
        </>
      ) : null}
    </>
  );
};

export default DashBoard;
