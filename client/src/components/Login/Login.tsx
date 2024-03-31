import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack, Snackbar, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/users";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [msg, setMsg] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
		const password = data.get("password")!.toString();

		dispatch(
			signInUser({
				email,
				password,
			}),
		)
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				setMsg(`${JSON.stringify(error.message)}`);
				if (error.statusCode) {
					setOpen(true);
					setTimeout(() => {
						if (error.statusCode === 307) {
							setMsg(`${JSON.stringify(error.message)}`);
							localStorage.setItem("verify", "true");
							navigate("/verify_email");
						}
					}, 3000);
				}
			});
	};

	const [open, setOpen] = useState(false);

	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		setMsg("");
	};

	return (
		<Container sx={{ width: "35%" }} component="main" maxWidth="xs">
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
			<CssBaseline />
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
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					{/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/forgotpassword" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
