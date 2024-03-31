import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/books";

const BookDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const params = useParams();

	useEffect(() => {
		if (params.bookId) dispatch(getBook({ bookId: params.bookId }));
	}, [dispatch, state.books.book, params.bookId]);

	const book = state.books.book;

	const formatDate = (dateString: any) => {
		return new Date(dateString).toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const clicked = () => {
		navigate("/");
	};

	return (
		<>
			{book ? (
				<Grid
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Card
						sx={{
							minWidth: "350px",
							width: "40%",
							marginTop: "7%",
						}}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom>
								Book Details
							</Typography>
							<Typography variant="h5" component="div">
								{book.title}
							</Typography>
							<Typography
								display={"inline"}
								sx={{ mb: 1.5 }}
								color="text.secondary">
								Authors: {book.authors.join(", ")}
							</Typography>
							<Typography variant="body2">
								Description: {book.description}
							</Typography>
							<Typography variant="body2">
								Publish Date: {formatDate(book.publishDate)}
							</Typography>
							<Typography variant="body2">
								Status: {book.status}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								onClick={() => {
									clicked();
								}}
								style={{ textDecoration: "none" }}>
								Return
							</Button>
						</CardActions>
					</Card>
				</Grid>
			) : null}
		</>
	);
};
export default BookDetails;
