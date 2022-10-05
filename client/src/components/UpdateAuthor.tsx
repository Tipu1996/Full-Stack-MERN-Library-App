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
  Typography,
} from "@mui/material";
// import { addAuthor } from "redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { addAuthor, removeAuthor } from "redux/books";
import { useNavigate } from "react-router-dom";

const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [task, setTask] = React.useState("");
  const [authors, setAuthor] = React.useState<string>("");
  const [tempBook] = React.useState(localStorage.getItem("book"));

  const handleFormChange = (event: SelectChangeEvent) => {
    setTask(event.target.value);
  };

  const handleChange = (event: any) => {
    let { value } = event.target;
    setAuthor(value);
  };

  const addClick = () => {
    let bookId = "";
    if (tempBook) {
      const book = JSON.parse(tempBook);
      bookId = book._id;
    }

    if (task === "add") {
      dispatch(
        addAuthor({
          url: "http://localhost:4000/api/v1/books/add_author",
          authors,
          bookId: bookId ? bookId : "",
        })
      );
      localStorage.removeItem("book");
      navigate("/");
    } else if (task === "remove") {
      dispatch(
        removeAuthor({
          url: "http://localhost:4000/api/v1/books/remove_author",
          authors,
          bookId: bookId ? bookId : "",
        })
      );
      localStorage.removeItem("book");

      navigate("/");
    }
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
        {task === "add" ? (
          <>
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
          <>
            {tempBook
              ? JSON.parse(tempBook).authors.map((author: string) => {
                  return (
                    <Box display={"flex"} mt={"20px"} mb={"20px"}>
                      <Typography variant="body1" display="flex">
                        {"Authors of the Book:  "}
                        <React.Fragment>&nbsp;</React.Fragment>
                      </Typography>
                      <Typography variant="body1" display="flex">
                        {author}
                      </Typography>
                    </Box>
                  );
                })
              : ""}
            <TextField
              sx={{
                width: "60%",
                display: "flex",
              }}
              placeholder="Enter Author Names"
              name="title"
              inputProps={{ "aria-label": "remove authors" }}
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
              Remove
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
};

export default UpdateAuthor;
