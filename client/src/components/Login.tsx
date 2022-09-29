import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/configureStore";
import { loginUser } from "redux/users";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  let state = useSelector((state: RootState) => state);
  const handleGoogleOnSuccess = async (response: any) => {
    console.log("response :", response);
    const jwt = await dispatch(
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
    );
    async function displayJWT() {
      console.log("jwt token: ", jwt.payload.token);
    }
    displayJWT();
  };

  useEffect(() => {
    console.log("User slice jwtToken is now: ", state.users.jwtToken);
  }, [state.users.jwtToken]);

  const handleGoogleOnFailure = () => {
    console.log("Login Failed");
  };
  return (
    <GoogleLogin
      onSuccess={handleGoogleOnSuccess}
      onError={handleGoogleOnFailure}
    />
  );
};

export default Login;
