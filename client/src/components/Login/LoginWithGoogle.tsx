import { Box, Container, CssBaseline } from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/configureStore";
import { getUser, loginUser } from "../../redux/users";

const LoginWithGoogle = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleGoogleOnSuccess = async (response: CredentialResponse) => {
		await dispatch(
			loginUser({
				body: {},
				header: {
					headers: {
						"content-type": "application/json",
						id_token: response.credential,
					},
				},
			}),
		).then((res) => {
			dispatch(
				getUser({
					userId: res.payload.id,
				}),
			).then(() => {
				localStorage.setItem("signedIn", "true");
				localStorage.setItem("userId", JSON.stringify(res.payload.id));
				navigate("/");
			});
		});
	};

	const handleGoogleOnFailure = () => {
		console.log("Login Failed");
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{/* <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              Please Sign-in
            </Typography> */}

				<GoogleLogin
					shape="rectangular"
					size="large"
					theme="outline"
					logo_alignment="center"
					onSuccess={(response) => {
						handleGoogleOnSuccess(response);
					}}
					onError={handleGoogleOnFailure}
				/>
			</Box>
		</Container>
	);
};

export default LoginWithGoogle;
