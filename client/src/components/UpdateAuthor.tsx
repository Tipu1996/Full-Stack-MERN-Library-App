import * as React from "react";
import Box from "@mui/material/Box";
import {
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
// import { addAuthor } from "redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { addAuthor } from "redux/books";

const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [task, setTask] = React.useState("");
  const [authors, setAuthor] = React.useState<string>("");

  const handleFormChange = (event: SelectChangeEvent) => {
    setTask(event.target.value);
  };

  const handleChange = (event: any) => {
    let { value } = event.target;
    setAuthor(value);
  };

  const addClick = () => {
    console.log(authors);
    const bookId = localStorage.getItem("bookId");
    if (task === "add") {
      dispatch(
        addAuthor({
          url: "http://localhost:4000/api/v1/books/add_author",
          authors,
          bookId: bookId ? bookId : "",
        })
      );
      //   setTimeout(() => {
      //     localStorage.removeItem("bookId");
      //   }, 2000);
    }
    // else {
    //   dispatch(
    //     addBook({
    //       url: `http://localhost:4000/api/v1/books/updateBook`,
    //       //   bookId: bookId ? bookId : "",
    //     })
    //   );
    //   localStorage.removeItem("bookId");
    // }
  };

  return (
    <Paper>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">
            Add or Remove Author?
          </InputLabel>
          <Select
            labelId="select-task"
            id="select-task"
            value={task}
            label="Update, Add or Remove Author?"
            onChange={handleFormChange}
          >
            <MenuItem value={"add"}>Add</MenuItem>
            <MenuItem value={"remove"}>Remove</MenuItem>
          </Select>
        </FormControl>
        {
          task === "add" ? (
            <>
              <h3>Adding</h3>
              <TextField
                sx={{
                  width: "60%",
                  display: "flex",
                }}
                placeholder="Author to add"
                name="title"
                inputProps={{ "aria-label": "add author" }}
                onChange={(event) => {
                  handleChange(event);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && event.preventDefault();
                }}
              />

              <Button
                onClick={(event) => {
                  addClick();
                }}
                type="button"
                sx={{ p: "7px" }}
                aria-label="search"
              >
                Add Author
              </Button>
            </>
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
