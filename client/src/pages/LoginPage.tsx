import Login from "../components/Login/Login";
import LoginWithGoogle from "../components/Login/LoginWithGoogle";
import React from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
	const loggedin = localStorage.getItem("signedIn");
	if (loggedin) {
		return (
			<React.Fragment>
				<Navigate to="/" />
			</React.Fragment>
		);
	}
	return (
		<>
			<Login />
			<LoginWithGoogle />
		</>
	);
};
export default LoginPage;
