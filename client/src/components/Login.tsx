import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "redux/configureStore";
import { getUser, loginUser } from "redux/users";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loggedIn, setLoggedIn] = useState<string | null>("false");
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
    ).then((res) => {
      dispatch(
        getUser({
          jwtToken: res.payload.token,
          userId: res.payload.id,
          url: `http://localhost:4000/api/v1/users`,
        })
      );
      localStorage.setItem("signedIn", "true");
      localStorage.setItem("userId", JSON.stringify(res.payload.id));
      setLoggedIn(localStorage.getItem("signedIn"));
      navigate("/");
      window.location.reload();
    });
  };
  useEffect(() => {
    setLoggedIn(localStorage.getItem("signedIn"));
  }, [loggedIn]);

  const handleGoogleOnFailure = () => {
    console.log("Login Failed");
  };
  return loggedIn !== "true" ? (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card
        sx={{
          display: "flex",
          minWidth: 275,
          width: "50%",
          mt: "20px",
          pb: "30px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Grid>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              Please Sign-in
            </Typography>
          </CardContent>
          <CardActions>
            <GoogleLogin
              shape="rectangular"
              size="large"
              theme="outline"
              logo_alignment="center"
              onSuccess={handleGoogleOnSuccess}
              onError={handleGoogleOnFailure}
            />
          </CardActions>
        </Grid>
      </Card>
    </Box>
  ) : (
    <h3>You are already loggedIn</h3>
  );
};

export default Login;
