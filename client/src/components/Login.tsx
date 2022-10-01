import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/configureStore";
import { loginUser } from "redux/users";
// import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  // const { state } = useLocation();
  const [result, setResult] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  // const onLogin = () => navigate(state.prev);
  const handleGoogleOnSuccess = async (response: any) => {
    await dispatch(
      loginUser({
        body: {},
        url: `http://localhost:4000/api/v1/users/login`,
        header: {
          headers: {
            "content-type": "application/json",
            id_token: response.credential,
          },
        },
      })
    ).then((data) => {
      setResult(data.payload.info);
      localStorage.setItem("jwtToken", data.payload.token);
    });
    // onLogin();
  };

  const handleGoogleOnFailure = () => {
    console.log("Login Failed");
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card sx={{ minWidth: 275, width: "50%" }}>
        <Grid>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              Please Sign-in
            </Typography>
          </CardContent>
          <CardActions>
            <GoogleLogin
              onSuccess={handleGoogleOnSuccess}
              onError={handleGoogleOnFailure}
            />
          </CardActions>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {result}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Box>
  );
};

export default Login;
