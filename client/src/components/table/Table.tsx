import { useEffect, useState } from "react";
import { getBooks, lendBook, removeBook } from "../../redux/books";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SearchFilter from "./SearchFilter";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TablePagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../redux/users";
import CheckBox from "./CheckBox";
import TableHeader from "./TableHeader";

const TableDisplay = () => {
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const navigate = useNavigate();

	const [admin, setAdmin] = useState<boolean | null>(false);
	const isAdmin = localStorage.getItem("isAdmin");

	useEffect(() => {
		if (isAdmin === "true") setAdmin(true);
		else if (isAdmin === "false") setAdmin(false);
	}, [isAdmin]);

	useEffect(() => {
		const userId = localStorage.getItem("userId") || null;
		dispatch(
			getBooks({
				searchBy: "getAll",
				bookToAdd: null,
			}),
		);
		if (userId)
			dispatch(
				getUser({
					userId: JSON.parse(userId),
				}),
			);
	}, [dispatch]);

	const user = state.users.user;
	let books = state.books.list;

	function remove(prop: string) {
		dispatch(
			removeBook({
				bookId: prop,
			}),
		).then(() => {
			dispatch(
				getBooks({
					searchBy: "getAll",
					bookToAdd: null,
				}),
			);
		});
	}

	function lend(bookId: string) {
		const user = localStorage.getItem("userId");
		dispatch(
			lendBook({
				bookId,
				userId: user ? JSON.parse(user) : "",
			}),
		).then(() => {
			dispatch(
				getBooks({
					searchBy: "getAll",
					bookToAdd: null,
				}),
			);
		});
	}

	function filterSearch() {
		books = state.books.list;
	}

	// pagination part

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

	return (
		<Box
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent={"center"}
			flexDirection={"column"}
			pt="20px">
			<Box width={"60%"} sx={{ paddingBottom: "20px" }}>
				<SearchFilter filterSearch={filterSearch} />
			</Box>
			<TableContainer
				sx={{ height: "100%", maxHeight: "100%", width: "90%" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHeader />
					<TableBody>
						{books
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage,
							)
							.map((book) => (
								<TableRow key={book.title}>
									<CheckBox book={book} />
									<TableCell align={"left"}>
										<Link
											style={{
												textDecoration: "none",
												color: "inherit",
											}}
											to={`/book_details/${book._id}`}>
											{book.title}
										</Link>
									</TableCell>
									<TableCell align={"left"}>
										{book.isbn}
									</TableCell>
									<TableCell align={"left"}>
										{book.authors.join(", ")}
									</TableCell>
									<TableCell align={"left"}>
										{book.categories.join(", ")}
									</TableCell>
									{book.status === "available" ? (
										<>
											<TableCell align={"left"}>
												{book.status
													.charAt(0)
													.toUpperCase() +
													book.status.slice(1)}
												:
												<Button
													variant="text"
													size="small"
													style={{
														textDecoration: "none",
													}}
													onClick={() =>
														book._id
															? lend(book._id)
															: null
													}>
													Lend Book
												</Button>
											</TableCell>
										</>
									) : JSON.stringify(book.borrower?._id) ===
									  JSON.stringify(user?._id) ? (
										<TableCell align={"left"}>
											Borrowed by you
										</TableCell>
									) : (
										<TableCell align={"left"}>
											Unavailable
										</TableCell>
									)}
									{admin ? (
										<>
											<TableCell align={"left"}>
												<Button
													variant="text"
													size="small"
													style={{
														textDecoration: "none",
														color: "inherit",
													}}
													onClick={() =>
														navigate(
															`/update/${book._id}`,
														)
													}>
													UPDATE
												</Button>
											</TableCell>
											{book.status === "available" ? (
												<TableCell
													align={"center"}
													onClick={() =>
														book._id
															? remove(book._id)
															: null
													}>
													<Button
														variant="text"
														size="small"
														style={{
															textDecoration:
																"none",
															color: "inherit",
														}}>
														<DeleteIcon color="inherit" />
													</Button>
												</TableCell>
											) : (
												<TableCell align={"center"}>
													<Button
														variant="text"
														size="small"
														style={{
															color: "disabled",
														}}
														disabled>
														<DeleteIcon color="disabled" />
													</Button>
												</TableCell>
											)}
										</>
									) : (
										""
									)}
								</TableRow>
							))}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}>
								{admin ? (
									<TableCell colSpan={7} />
								) : (
									<TableCell colSpan={5} />
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					rowsPerPageOptions={[10, 15, 25]}
					count={books.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</Box>
	);
};

export default TableDisplay;
