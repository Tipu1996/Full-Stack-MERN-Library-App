import {
	Box,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Tooltip,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../types";
import { getUsers, removeUser } from "../../redux/users";

const ShowUsers = () => {
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const [showUsers, setShowUsers] = useState(false);
	const [allUsers, setAllUsers] = useState<User[]>([]);

	useEffect(() => {
		setAllUsers(state.users.list);
	}, [showUsers, allUsers, state.users.list]);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const getUsersClick = () => {
		setShowUsers(showUsers ? false : true);
	};

	function remove(prop: string) {
		dispatch(
			removeUser({
				userId: prop,
			}),
		).then(() => {
			dispatch(getUsers());
		});
	}

	return (
		<>
			<Box
				textAlign="center"
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					mt: "30px",
				}}>
				<Button
					variant="outlined"
					type="button"
					sx={{ p: "7px" }}
					aria-label="search"
					onClick={() => getUsersClick()}>
					Get All Registered Users
					{!showUsers ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
				</Button>
			</Box>
			{showUsers ? (
				<Box
					width="100%"
					display="flex"
					alignItems="center"
					justifyContent={"center"}
					flexDirection={"column"}
					pt="20px"
					pb={"20px"}>
					<TableContainer sx={{ maxHeight: "100%", width: "90%" }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell variant="head">Name</TableCell>
									<TableCell variant="head">Email</TableCell>
									<TableCell variant="head">
										Borrowed Books
									</TableCell>
									<TableCell variant="head" align={"center"}>
										<DeleteIcon />
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allUsers.map((user) => (
									<TableRow key={user.email}>
										<TableCell align={"left"}>
											{user.firstName} {user.lastName}
										</TableCell>
										<TableCell align={"left"}>
											{user.email}
										</TableCell>
										<TableCell align={"left"}>
											{user.isVerified ? (
												user.borrowedBooks.length !==
												0 ? (
													user.borrowedBooks.map(
														(book) => {
															return (
																<p
																	key={
																		book._id
																	}>
																	{book.title}
																</p>
															);
														},
													)
												) : (
													<p>No Books Borrowed</p>
												)
											) : null}
										</TableCell>
										<TableCell align={"center"}>
											{user.isAdmin ? (
												<p>isAdmin</p>
											) : user.isVerified ? (
												<Button
													disabled
													variant="text"
													size="small"
													style={{
														color: "disabled",
													}}>
													<Tooltip title="Verified Account">
														<DeleteIcon color="disabled" />
													</Tooltip>
												</Button>
											) : (
												<Button
													variant="text"
													size="small"
													style={{
														textDecoration: "none",
														color: "inherit",
													}}
													onClick={() =>
														remove(user._id)
													}>
													<Tooltip title="Account not yet Verified">
														<DeleteIcon color="inherit" />
													</Tooltip>
												</Button>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			) : null}
		</>
	);
};
export default ShowUsers;
