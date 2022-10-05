import { useEffect, useState } from "react";
import { getBooks, lendBook, removeBook } from "redux/books";
import { Book } from "types";
import { AppDispatch, RootState } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
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

  // user: "6339d7f6d860fa5b5186f848"    books: "6339d7f6d860fa5b5186f848"

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
    dispatch(
      lendBook({
        url: "http://localhost:4000/api/v1/books/lend",
        bookId,
        userId: user ? JSON.parse(user) : "",
      })
    );
  }

  function filterSearch() {
    books = state.books.list;
  }

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          sx={{ minWidth: "95%" }}
        >
          <Box sx={{ paddingBottom: "20px" }}>
            <SearchFilter filterSearch={filterSearch} />
          </Box>
          <TableContainer sx={{ maxHeight: "100%", width: "90%" }}>
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
                      <TableCell align={"left"}>Update</TableCell>
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
                          {book.status}
                          <Button
                            variant="outlined"
                            size="small"
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
                          <Button variant="outlined" size="small">
                            Remove
                          </Button>
                        </TableCell>
                        <TableCell align={"left"}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => update(book._id, book)}
                          >
                            <Link
                              to="/update"
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              Update
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
      </Paper>
    </>
  );
};

export default TableDisplay;
