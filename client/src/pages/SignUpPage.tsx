import SignUp from "../components/Login/SignUp";
import React from "react";
import { Navigate } from "react-router-dom";

const SignUpPage = () => {
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
			<SignUp />
		</>
	);
};
export default SignUpPage;
