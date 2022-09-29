import { useEffect } from "react";
import { getBooks } from "redux/books";
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
import { Box } from "@mui/material";

const TableDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  let state = useSelector((state: RootState) => state);
  let allBooks: Book[] = state.books.list;
  useEffect(() => {
    const token = localStorage.getItem("jwtToken") || null;
    // if (state.users.jwtToken)
    if (token)
      dispatch(
        getBooks({
          // jwtToken: state.users.jwtToken,
          jwtToken: token,
          searchBy: "getAll",
          url: "http://localhost:4000/api/v1/books/",
          bookToAdd: null,
        })
      );
  }, [dispatch, state.users.jwtToken]);

  function filterSearch() {
    allBooks = state.books.list;
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
                </TableRow>
              </TableHead>
              <TableBody>
                {allBooks.map((book) => (
                  <TableRow key={book.title}>
                    <TableCell align={"left"}>{book.title}</TableCell>
                    <TableCell align={"left"}>{book.isbn}</TableCell>
                    <TableCell align={"left"}>
                      {book.authors.join(", ")}
                    </TableCell>
                    <TableCell align={"left"}>
                      {book.categories.join(", ")}
                    </TableCell>
                    <TableCell align={"left"}>{book.status}</TableCell>
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
