import { Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { returnBook } from "../redux/books";
import { AppDispatch, RootState } from "../redux/configureStore";

const BorrowedBooks = () => {
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const user = state.users.user;
	const allBooks = state.books.list;

	function returning(bookId: string) {
		const user = localStorage.getItem("userId");
		dispatch(
			returnBook({
				bookId,
				userId: user ? JSON.parse(user) : "",
			}),
		);
	}

	const formatDate = (dateString: any) => {
		return new Date(dateString).toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<>
			{user ? (
				<>
					<Typography
						align="center"
						variant="h6"
						m={"2% 0 1% 0"}
						sx={{
							fontWeight: 400,
							textDecoration: "underline",
							textUnderlineOffset: "3px",
							textDecorationThickness: "1px",
						}}>
						Borrowed Books
					</Typography>
					{allBooks.map((book) =>
						user._id === book?.borrower?._id ? (
							<Box
								key={book.isbn}
								width={"100%"}
								display="flex"
								flexDirection={"column"}
								alignItems="center"
								justifyContent={"center"}>
								<Typography variant="body1">
									Title:{"\u00A0"}
									{book.title}
								</Typography>
								<Typography mt={"10px"} variant="body1">
									Borrow Date:{"\u00A0"}
									{formatDate(book.borrowDate)}
								</Typography>
								<Button
									sx={{
										justifyContent: "center",
										m: "10px 0 20px 0",
									}}
									variant="outlined"
									size="small"
									onClick={() =>
										book._id ? returning(book._id) : null
									}>
									Return Book
								</Button>
							</Box>
						) : null,
					)}
				</>
			) : null}
		</>
	);
};

export default BorrowedBooks;
