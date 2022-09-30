import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/configureStore";
import { loginUser } from "redux/users";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleGoogleOnSuccess = async (response: any) => {
    // console.log("response :", response);
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
    async function setLocalStorageJWT() {
      localStorage.setItem("jwtToken", jwt.payload.token);
    }
    setLocalStorageJWT();
  };

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
