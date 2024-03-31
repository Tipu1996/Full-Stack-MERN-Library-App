import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/books";
import { AppDispatch, RootState } from "../redux/configureStore";
import { getUser } from "../redux/users";

const PersonalProfile = () => {
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const user = state.users.user;

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

	const tempPic = localStorage.getItem("picture");

	const [pic, setPic] = useState("");

	useEffect(() => {
		if (tempPic) setPic(tempPic);
	}, [tempPic]);

	return (
		<Box
			display={"flex"}
			justifyContent="center"
			flexDirection={"column"}
			alignItems={"center"}
			m={"20px 0 20px 0"}>
			<Box
				display={"flex"}
				justifyContent="center"
				flexDirection={"row"}
				alignItems={"center"}
				m={"20px 0 10px 0"}>
				<Avatar
					alt={user?.firstName}
					src={pic}
					sx={{ mr: "10px", width: "60px", height: "60px" }}
				/>
				<Typography
					align="center"
					variant="h5"
					sx={{
						textDecoration: "underline",
						textUnderlineOffset: "3px",
						textDecorationThickness: "1px",
					}}>
					Personal Profile
				</Typography>
			</Box>
			{user ? (
				<>
					<Typography align="center" variant="body1" mb={"10px"}>
						Name:{"\u00A0"}
						{user.firstName}
						{"\u00A0"}
						{user.lastName}
					</Typography>
					<Typography align="center" variant="body1">
						Email:{"\u00A0"}
						{user.email}
					</Typography>
				</>
			) : null}
		</Box>
	);
};

export default PersonalProfile;
