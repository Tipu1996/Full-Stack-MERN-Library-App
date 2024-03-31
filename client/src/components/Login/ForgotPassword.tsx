import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Avatar, Container, Snackbar, Stack } from "@mui/material";
import { FormEvent, SyntheticEvent, useState } from "react";
import { AppDispatch } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCodeForPasswordReset } from "../../redux/users";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const ForgotPassword = () => {
	const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email")!.toString();

		dispatch(
			setCodeForPasswordReset({
				email,
			}),
		)
			.unwrap()
			.then(() => {
				setMsg("Check your email and enter the verification code.");
				setOpen(true);
				localStorage.setItem("resetPW", "true");
				setTimeout(() => {
					navigate("/resetpassword");
				}, 3000);
			})
			.catch((error) => {
				console.log(error);
				if (error.message === "some error occurred") {
					setMsg(`${JSON.stringify(error.message)}`);
					setTimeout(() => {
						navigate("/login");
					}, 2000);
				}
				setMsg(`${JSON.stringify(error.message)}`);
				setOpen(true);
			});
	};

	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		setMsg("");
	};

	return (
		<Container sx={{ width: "50%" }} component="main" maxWidth="xs">
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
							{msg}
						</Alert>
					</Snackbar>
				</Stack>
			</Box>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<MarkEmailReadIcon />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					textAlign={"center"}
					marginTop="10px">
					Enter Email to Reset Password
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{
						marginTop: 3,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						minWidth: "80%",
					}}>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Send Code to Email
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ForgotPassword;
