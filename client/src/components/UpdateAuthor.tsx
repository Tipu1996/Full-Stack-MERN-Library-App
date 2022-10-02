import * as React from "react";
import Box from "@mui/material/Box";
import {
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { addBook } from "redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { alignProperty } from "@mui/material/styles/cssUtils";

const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [task, setTask] = React.useState("");

  const handleFormChange = (event: SelectChangeEvent) => {
    setTask(event.target.value);
  };
  const [author, setAuthor] = React.useState({
    authors: [], //array string
  });

  const handleChange = (event: any) => {
    let { name, value } = event.target;
    if (name === "authors") {
      value = value.split(", ");
    }
    setAuthor((prevState) => ({ ...prevState, [name]: value }));
  };

  const addClick = () => {
    // console.log(JSON.stringify(author));
    // dispatch(
    //   addBook({
    //     searchBy: "addBook",
    //     url: `http://localhost:4000/api/v1/books/addbook`,
    //     bookToAdd: author,
    //   })
    // );
  };

  return (
    <Paper>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-label">
            Update, Add or Remove Author?
          </InputLabel>
          <Select
            labelId="select-task"
            id="select-task"
            value={task}
            label="Update, Add or Remove Author?"
            onChange={handleFormChange}
          >
            <MenuItem value={"update"}>Update</MenuItem>
            <MenuItem value={"add"}>Add</MenuItem>
            <MenuItem value={"remove"}>Remove</MenuItem>
          </Select>
        </FormControl>
        {
          task === "update" ? (
            <h3>Updating</h3>
          ) : task === "add" ? (
            <h3>Adding</h3>
          ) : task === "remove" ? (
            <h3>Removing</h3>
          ) : (
            ""
          ) /* 
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
        </IconButton> */
        }
      </Box>
    </Paper>
  );
};

export default UpdateAuthor;
