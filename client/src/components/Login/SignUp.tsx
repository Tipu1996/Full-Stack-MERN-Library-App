import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Container, Snackbar, Stack } from "@mui/material";
import { FormEvent, SyntheticEvent, useState } from "react";
import { AppDispatch } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/users";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const regexExp =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
		const data = new FormData(event.currentTarget);
		const email = data.get("email")!.toString();
		if (!regexExp.test(email)) {
			setOpen(true);
			setMsg("Enter Valid Email Address");
			return;
		}
		if (email.split("@")[1].split(".")[0] === "gmail") {
			setOpen(true);
			setMsg("Sign in with Google");
			setTimeout(() => {
				navigate("/login");
			}, 3000);
			return;
		}
		const firstName = data.get("firstName")!.toString();
		const lastName = data.get("lastName")!.toString();
		const password = data.get("password")!.toString();

		dispatch(
			signUpUser({
				email,
				password,
				firstName,
				lastName,
			}),
		)
			.unwrap()
			.then(() => {
				setMsg("Account Successfully Created; Verify your account");
				setOpen(true);
				setTimeout(() => {
					localStorage.setItem("verify", "true");
					navigate("/verify_email");
				}, 3000);
			})
			.catch((error) => {
				console.log(error);
				setMsg(`Error: ${JSON.stringify(error.message)}`);
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
							<Link href="/login" variant="body2">
								{msg}
							</Link>
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
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password, minimum 5 digits/alphabets"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUp;
