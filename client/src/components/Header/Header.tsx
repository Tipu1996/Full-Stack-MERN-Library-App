import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ThemeChange from "../ThemeChange";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { TokenObject } from "../../types";

import { clearedCart, getBooks, lendBook } from "../../redux/books";
import HeaderMenu from "./HeaderMenu";

export const tokenExpiry = () => {
	const token = localStorage.getItem("jwtToken");
	if (token) {
		const decodedUser: TokenObject = jwtDecode(token);
		if (decodedUser.exp * 1000 < Date.now()) {
			localStorage.clear();
			window.location.reload();
			return false;
		} else {
			setTimeout(() => {
				localStorage.clear();
				window.location.reload();
				return false;
			}, decodedUser.exp * 1000 - Date.now());
			return true;
		}
	}
	return false;
};

const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
	const cartBadge = useSelector(
		(state: RootState) => state.books.numberInCart,
	);
	const cart = useSelector((state: RootState) => state.books.cartList);

	const lendBooks = () => {
		const user = localStorage.getItem("userId");
		cart.forEach((item) => {
			dispatch(
				lendBook({
					bookId: item._id ? item._id : "",
					userId: user ? JSON.parse(user) : "",
				}),
			).then(() => {
				dispatch(
					getBooks({
						searchBy: "getAll",
						bookToAdd: null,
					}),
				).then(() => dispatch(clearedCart()));
			});
		});
	};

	useEffect(() => {
		tokenExpiry();
	}, []);

	return (
		<AppBar position="static">
			<Toolbar
				sx={{
					justifyContent: "space-between",
				}}>
				<Link
					to="/"
					style={{ textDecoration: "none", color: "inherit" }}>
					<Tooltip title="return to homepage">
						<Box display="flex" alignItems="center">
							<LibraryBooksIcon sx={{ mr: 3 }} />
							<Typography
								variant="h6"
								component="h2"
								sx={{
									mr: 2,
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
								}}>
								LIBRARY
							</Typography>
						</Box>
					</Tooltip>
				</Link>

				<Box
					display="flex"
					sx={{ justifyContent: "space-between" }}
					alignItems="center"
					flexDirection={"row"}>
					<ThemeChange />
					<Tooltip title="select books to borrow">
						<Box mt={"0.55%"}>
							<IconButton aria-label="" onClick={lendBooks}>
								<Badge badgeContent={cartBadge} color="success">
									<AddIcon />
								</Badge>
							</IconButton>
						</Box>
					</Tooltip>
					<HeaderMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
