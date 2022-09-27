import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleGoogleOnSuccess = (response: any) => {
    console.log("response :", response);
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
