import { ChangeEvent, forwardRef, SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, TextField, Button, Snackbar, Stack } from "@mui/material";
import { addBook } from "../../redux/books";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Book } from "../../types";
import { useNavigate } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddBook = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [showForm, setShowForm] = useState(true);
	const [message, setMessage] = useState("");

	const [book, setBook] = useState<Book>({
		title: "",
		isbn: "",
		description: "",
		publisher: "",
		authors: [],
		categories: [],
		status: "available",
		borrower: null,
		publishDate: new Date("January 01, 0000 00:00:00"),
		borrowDate: null,
		returnDate: null,
	});

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		let { name, value } = event.target;
		if (name === "publishDate") {
			let tempValue = value.split(",");
			let result: string[] = tempValue.map((val: string) => val.trim());
			let result1: string = result.toString();
			let result2 = new Date(Date.parse(result1));
			setBook((prevState) => ({ ...prevState, [name]: result2 }));
		} else if (name === "categories" || name === "authors") {
			let tempValue = value.split(",");
			let result = tempValue.map((val: string) => val.trim());
			setBook((prevState) => ({ ...prevState, [name]: result }));
		} else if (name === "title") {
			setBook((prevState) => ({ ...prevState, [name]: value }));
		} else if (name === "description") {
			setBook((prevState) => ({ ...prevState, [name]: value }));
		} else if (name === "isbn") {
			setBook((prevState) => ({ ...prevState, [name]: value }));
		} else if (name === "publisher") {
			setBook((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const addClick = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			addBook({
				bookToAdd: book,
			}),
		)
			.unwrap()
			.then(() => navigate("/"))
			.catch((error) => {
				console.log("failure ", error);
				if (error.error === undefined)
					setMessage("Please fill all the fields in the form");
				else setMessage(JSON.stringify(error.error));
				handleClick();
			});
	};

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setMessage("");
		setOpen(false);
	};

	return (
		<>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					mb: "10px",
				}}>
				<Button
					variant="outlined"
					type="button"
					sx={{ p: "7px", m: "10px 0 10px 0" }}
					aria-label="search"
					onClick={() => setShowForm(showForm ? false : true)}>
					Add New Book
					{!showForm ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
				</Button>
			</Box>
			<Box
				width={"100%"}
				display="flex"
				alignItems="center"
				justifyContent={"center"}>
				<Stack spacing={2} sx={{ width: "100%" }}>
					<Snackbar
						open={open}
						autoHideDuration={6000}
						onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity="error"
							sx={{ width: "100%" }}>
							ERROR! {message}
						</Alert>
					</Snackbar>
				</Stack>
			</Box>
			{showForm ? (
				<Box
					component="form"
					onSubmit={(event) => addClick(event)}
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						name="title"
						label="Title"
						inputProps={{ "aria-label": "enter title" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						label="ISBN"
						name="isbn"
						inputProps={{ "aria-label": "enter isbn" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						label="Description"
						name="description"
						inputProps={{ "aria-label": "enter description" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						label="Publisher"
						name="publisher"
						inputProps={{ "aria-label": "enter publishers" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						label="Authors"
						name="authors"
						inputProps={{ "aria-label": "enter authors" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
							mb: "10px",
						}}
						label="Categories"
						name="categories"
						inputProps={{ "aria-label": "enter categories" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<TextField
						sx={{
							width: "60%",
							display: "flex",
						}}
						label="Publish Date: year, month, day"
						name="publishDate"
						inputProps={{ "aria-label": "enter date" }}
						onChange={(event) => {
							handleChange(event);
						}}
						required
					/>
					<Box m={"15px"}>
						<Button
							type="submit"
							variant="text"
							size="small"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}>
							Add To Library
						</Button>
						<IconButton
							type="submit"
							sx={{ p: "7px 7px 10px 7px" }}
							aria-label="search">
							<DriveFolderUploadIcon fontSize="medium" />
						</IconButton>
					</Box>
				</Box>
			) : null}
		</>
	);
};

export default AddBook;
