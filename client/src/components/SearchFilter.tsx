import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { IconButton, TextField } from "@mui/material";
import { getBooks } from "redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";

const SearchFilter = ({ filterSearch }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const searchClick = async (event: any) => {
    event.preventDefault();
    if (filter === "title") {
      dispatch(
        getBooks({
          searchBy: "getByTitle",
          url: `http://localhost:4000/api/v1/books/title/${search}`,
          bookToAdd: null,
        })
      );
    } else if (filter === "author") {
      dispatch(
        getBooks({
          searchBy: "getByAuthor",
          url: `http://localhost:4000/api/v1/books/author/${search}`,
          bookToAdd: null,
        })
      );
    } else if (filter === "status") {
      dispatch(
        getBooks({
          searchBy: "getByStatus",
          url: `http://localhost:4000/api/v1/books/status/${search}`,
          bookToAdd: null,
        })
      );
    } else if (filter === "category") {
      dispatch(
        getBooks({
          searchBy: "getByCategory",
          url: `http://localhost:4000/api/v1/books/category/${search}`,
          bookToAdd: null,
        })
      );
    }
  };

  function clearAll() {
    const token = localStorage.getItem("jwtToken") || null;
    dispatch(
      getBooks({
        jwtToken: token,
        searchBy: "getAll",
        url: "http://localhost:4000/api/v1/books/",
        bookToAdd: null,
      })
    );
  }

  return (
    <Box display={"flex"} width={"100%"}>
      <FormControl sx={{ ml: "3%", flex: 0.9 }}>
        <InputLabel id="filter-by">Filter By</InputLabel>
        <Select
          labelId="select-filter"
          id="select-filter"
          value={filter}
          label="Filter By"
          onChange={handleChange}
        >
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"author"}>Author</MenuItem>
          <MenuItem value={"status"}>Status</MenuItem>
          <MenuItem value={"category"}>Category</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={{ ml: "3%", flex: 1 }}
        placeholder="Search Books"
        inputProps={{ "aria-label": "search books" }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && event.preventDefault();
          event.key === "Enter" && searchClick(event);
          event.key === "Enter" && filterSearch();
        }}
      />
      <IconButton
        onClick={(event) => {
          searchClick(event);
          filterSearch();
        }}
        type="button"
        sx={{ p: "10px", ml: "3%" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          clearAll();
        }}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <ClearAllIcon />
      </IconButton>
    </Box>
  );
};

export default SearchFilter;
