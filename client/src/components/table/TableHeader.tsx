import { TableHead, TableRow, TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

const TableHeader = () => {
  const [admin, setAdmin] = useState<boolean | null>(false);

  const label = { inputProps: { "aria-label": "Checkbox" } };

  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (isAdmin === "true") setAdmin(true);
    else if (isAdmin === "false") setAdmin(false);
  }, [isAdmin]);

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" variant="head">
          <Checkbox {...label} size="small" />
        </TableCell>
        <TableCell variant="head">Title</TableCell>
        <TableCell variant="head">ISBN</TableCell>
        <TableCell variant="head">Authors</TableCell>
        <TableCell variant="head">Categories</TableCell>
        <TableCell variant="head">Status</TableCell>
        {admin ? (
          <>
            <TableCell variant="head" align={"left"}>
              UPDATE
            </TableCell>
            <TableCell variant="head" align={"center"}>
              <DeleteIcon />
            </TableCell>
          </>
        ) : (
          ""
        )}
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;
