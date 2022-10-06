import { useEffect, useState } from "react";
import { getBooks, lendBook, removeBook } from "redux/books";
import { Book } from "types";
import { AppDispatch, RootState } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchFilter from "./SearchFilter";
import { Box, Button } from "@mui/material";
import mongoose, { ObjectId } from "mongoose";
import { Link } from "react-router-dom";
import { getUser } from "redux/users";

const TableDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const [admin, setAdmin] = useState<boolean | null>(false);

  const isAdmin = localStorage.getItem("isAdmin");
  useEffect(() => {
    if (isAdmin === "true") setAdmin(true);
    else if (isAdmin === "false") setAdmin(false);
  }, [isAdmin]);

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
  let books = state.books.list;

  function remove(prop: mongoose.Schema.Types.ObjectId) {
    dispatch(
      removeBook({
        searchBy: "removeBook",
        url: "http://localhost:4000/api/v1/books/",
        bookId: prop,
      })
    );
    window.location.reload();
  }

  function update(prop: ObjectId, book: Book) {
    localStorage.setItem("book", JSON.stringify(book));
  }

  function lend(bookId: mongoose.Schema.Types.ObjectId) {
    const user = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken") || null;
    dispatch(
      lendBook({
        url: "http://localhost:4000/api/v1/books/lend",
        bookId,
        userId: user ? JSON.parse(user) : "",
      })
    ).then(() => {
      dispatch(
        getBooks({
          jwtToken: token,
          searchBy: "getAll",
          url: "http://localhost:4000/api/v1/books/",
          bookToAdd: null,
        })
      );
    });
  }

  function filterSearch() {
    books = state.books.list;
  }

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        flexDirection={"column"}
        pt="20px"
      >
        <Box width={"60%"} sx={{ paddingBottom: "20px" }}>
          <SearchFilter filterSearch={filterSearch} />
        </Box>
        <TableContainer
          sx={{ height: "100%", maxHeight: "100%", width: "90%" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Status</TableCell>
                {admin ? (
                  <>
                    <TableCell align={"left"}>REMOVE</TableCell>
                    <TableCell align={"left"}>UPDATE</TableCell>
                  </>
                ) : (
                  ""
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.title}>
                  <TableCell align={"left"}>{book.title}</TableCell>
                  <TableCell align={"left"}>{book.isbn}</TableCell>
                  <TableCell align={"left"}>
                    {book.authors.join(", ")}
                  </TableCell>
                  <TableCell align={"left"}>
                    {book.categories.join(", ")}
                  </TableCell>
                  {book.status === "available" ? (
                    <>
                      <TableCell align={"left"}>
                        {book.status.charAt(0).toUpperCase() +
                          book.status.slice(1)}
                        :
                        <Button
                          variant="text"
                          size="small"
                          style={{ textDecoration: "none" }}
                          onClick={() => lend(book._id)}
                        >
                          Lend Book
                        </Button>
                      </TableCell>
                    </>
                  ) : JSON.stringify(book.borrower?._id) ===
                    JSON.stringify(user?._id) ? (
                    <TableCell align={"left"}>Borrowed by you</TableCell>
                  ) : (
                    <TableCell align={"left"}>Unavailable</TableCell>
                  )}
                  {admin ? (
                    <>
                      <TableCell
                        align={"left"}
                        onClick={() => remove(book._id)}
                      >
                        <Button
                          variant="text"
                          size="small"
                          style={{ textDecoration: "none" }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                      <TableCell align={"left"}>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => update(book._id, book)}
                        >
                          <Link
                            to="/update"
                            style={{ textDecoration: "none", color: "#90caf9" }}
                          >
                            UPDATE
                          </Link>
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    ""
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TableDisplay;
