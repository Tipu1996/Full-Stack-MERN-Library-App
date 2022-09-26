import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, IconButton, TextField } from "@mui/material";
import { addBook } from "redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";

const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [book, setBook] = React.useState({
    title: "",
    isbn: "",
    description: "",
    publisher: "",
    authors: [], //array string
    categories: [], //array string
    status: "available",
    borrower: null,
    publishDate: {
      type: Date,
      required: true,
    },
    borrowDate: null,
    returnDate: null,
  });

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
    console.log(JSON.stringify(book));

    dispatch(
      addBook({
        searchBy: "addBook",
        url: `http://localhost:4000/api/v1/books/`,
        bookToAdd: book,
      })
    );
  };

  return (
    <Paper>
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
        <IconButton
          onClick={(event) => {
            addClick();
          }}
          type="button"
          sx={{ p: "7px" }}
          aria-label="search"
        >
          Upload Book
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AddForm;

//   const addClick = async (event: any) => {
//     event.preventDefault();
//     if (filter === "title") {
//       dispatch(
//         getBooks({
//           searchBy: "getByTitle",
//           url: `http://localhost:4000/api/v1/books/title/${search}`,
//         })
//       );
//     } else if (filter === "author") {
//       dispatch(
//         getBooks({
//           searchBy: "getByAuthor",
//           url: `http://localhost:4000/api/v1/books/author/${search}`,
//         })
//       );
//     } else if (filter === "status") {
//       dispatch(
//         getBooks({
//           searchBy: "getByStatus",
//           url: `http://localhost:4000/api/v1/books/status/${search}`,
//         })
//       );
//     } else if (filter === "category") {
//       dispatch(
//         getBooks({
//           searchBy: "getByCategory",
//           url: `http://localhost:4000/api/v1/books/category/${search}`,
//         })
//       );
//     }
//   };
