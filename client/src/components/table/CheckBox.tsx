import { TableCell, Checkbox } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/configureStore";
import { Book } from "types";
import { addedToCart, removedFromCart } from "../../redux/books";

const CheckBox = (prop: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const book = prop.book;
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [checked, setChecked] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    book: Book
  ) => {
    setChecked(!checked);

    if (event.target.checked) {
      dispatch(addedToCart(book));
    } else {
      dispatch(removedFromCart(book));
    }
  };

  return (
    <TableCell align="center">
      {book.status === "available" ? (
        <Checkbox
          checked={checked}
          onChange={(event) => handleChange(event, book)}
          {...label}
          size="small"
        />
      ) : (
        <Checkbox checked={checked} {...label} size="small" disabled />
      )}
    </TableCell>
  );
};

export default CheckBox;
