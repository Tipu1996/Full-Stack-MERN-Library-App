import {
  Avatar,
  Box,
  Button,
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
import { getUsers } from "redux/users";
import { User } from "types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const [isAdmin] = useState(localStorage.getItem("isAdmin"));
  const [showUsers, setShowUsers] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  let tempUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    tempUser ? JSON.parse(tempUser) : null
  );

  const tempPic = localStorage.getItem("picture");

  const [pic, setPic] = useState("");

  useEffect(() => {
    if (tempPic) setPic(tempPic);
  }, [tempPic]);

  useEffect(() => {
    setUser(tempUser ? JSON.parse(tempUser) : null);
  }, [tempUser]);

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

  // function returning(bookId: mongoose.Schema.Types.ObjectId) {
  //   const user = localStorage.getItem("userId");
  //   dispatch(
  //     returnBook({
  //       url: "http://localhost:4000/api/v1/books/return",
  //       bookId,
  //       userId: user ? JSON.parse(user) : "",
  //     })
  //   );
  // }

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
      ) : (
        ""
      )}
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
        <Typography
          align="center"
          variant="h5"
          sx={{ textDecoration: "underline" }}
        >
          Personal Profile
        </Typography>
        <Avatar
          alt={user?.firstName}
          src={pic}
          sx={{ ml: "5px", width: "60px", height: "60px" }}
        />
      </Box>
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
            {user ? (
              <TableRow key={user.email}>
                <TableCell align={"left"}>{user.firstName}</TableCell>
                <TableCell align={"left"}>{user.email}</TableCell>
                <TableCell align={"left"}>
                  {
                    <Button
                      variant="outlined"
                      size="small"
                      // onClick={() => returning(book._id)}
                    >
                      {JSON.stringify(user.borrowedBooks)}
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashBoard;
