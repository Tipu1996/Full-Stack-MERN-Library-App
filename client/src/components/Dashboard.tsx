import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/configureStore";
import { AppDispatch } from "redux/store";
import { getUser } from "redux/users";
import { getBooks, returnBook } from "redux/books";
import mongoose from "mongoose";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);

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
          <Box m={"20px 0 10px 20px"}>
            <Typography align="center" variant="body1" mb={"10px"}>
              Name:{"\u00A0"}
              {user.firstName}
              {"\u00A0"}
              {user.lastName}
            </Typography>
            <Typography align="center" variant="body1">
              Email:{"\u00A0"}
              {user.email}
            </Typography>
          </Box>
          {allBooks.map((book) =>
            user._id === book?.borrower?._id ? (
              <Box m={"20px 0 10px 20px"} key={book.isbn}>
                <Typography variant="body1">
                  Title:{"\u00A0"}
                  {book.title}
                </Typography>
                <Typography mt={"10px"} variant="body1">
                  Borrow Date:{"\u00A0"}
                  {JSON.stringify(book.borrowDate)}
                </Typography>
                <Button
                  sx={{ justifyContent: "center", mt: "10px" }}
                  variant="outlined"
                  size="small"
                  onClick={() => returning(book._id)}
                >
                  Return Book
                </Button>
              </Box>
            ) : null
          )}
        </>
      ) : null}
    </>
  );
};

export default DashBoard;
