import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Button,
	Typography,
	TextField,
	Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addAuthor, getBook, removeAuthor } from "../../redux/books";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAuthor = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const state = useSelector((state: RootState) => state);
	const params = useParams();
	useEffect(() => {
		if (params.bookId) dispatch(getBook({ bookId: params.bookId }));
	}, [dispatch, params.bookId, state.books.book]);

	const book = state.books.book;

	const [task, setTask] = useState("");
	const [authors, setAuthors] = useState<string>("");

	const handleFormChange = (event: SelectChangeEvent) => {
		setTask(event.target.value);
	};

	const handleChangeAdd = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		let { value } = event.target;
		setAuthors(value);
	};

	const handleChangeRemove = (author: string) => {
		addClick(author);
	};

	const addClick = (author: string) => {
		if (task === "add") {
			dispatch(
				addAuthor({
					author: authors,
					bookId: book?._id ? book._id : "",
				}),
			).then(() => navigate("/"));
		} else if (task === "remove") {
			dispatch(
				removeAuthor({
					author,
					bookId: book?._id ? book._id : "",
				}),
			);
		}
	};

	return (
		<>
			<Box
				display={"flex"}
				flexDirection="column"
				width={"100%"}
				alignItems="center"
				mt={"20px"}>
				<FormControl sx={{ width: "30%" }}>
					<InputLabel id="demo-simple-select-label">
						Add or Remove Author?
					</InputLabel>
					<Select
						labelId="select-task"
						id="select-task"
						value={task}
						label="Update, Add or Remove Author?"
						onChange={handleFormChange}>
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
								mt: "20px",
							}}
							placeholder="Author"
							name="title"
							inputProps={{ "aria-label": "add author" }}
							onChange={(event) => {
								handleChangeAdd(event);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") addClick("none");
							}}
						/>

						<Button
							onClick={(event) => {
								addClick("none");
							}}
							type="button"
							sx={{ p: "7px" }}
							aria-label="search">
							Add Author
						</Button>
					</>
				) : task === "remove" ? (
					<>
						<Typography
							variant="body1"
							mt={"30px"}
							sx={{
								textDecoration: "underline",
								textUnderlineOffset: "3px",
								textDecorationThickness: "1px",
							}}>
							{"Click on the Author to Remove"}
						</Typography>
						{book
							? book.authors.map((author: string) => {
									return (
										<Box
											display={"flex"}
											flexDirection="row"
											mt={"10px"}
											alignItems={"center"}
											key={author}>
											<Typography
												variant="body1"
												display="flex">
												<Button
													variant="text"
													onClick={() => {
														handleChangeRemove(
															author,
														);
													}}>
													{author}
												</Button>
											</Typography>
										</Box>
									);
							  })
							: ""}
					</>
				) : (
					""
				)}
			</Box>
			<Divider
				sx={{
					borderBottomWidth: 2,
					marginLeft: "8%",
					marginRight: "8%",
					marginTop: "30px",
				}}
			/>
			<Typography variant="body1" mt={"15px"} align="center">
				<Button
					size="small"
					onClick={() => {
						navigate("/");
					}}>
					Return
				</Button>
			</Typography>
		</>
	);
};

export default UpdateAuthor;
