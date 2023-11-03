import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "components/App";
import store from "redux/configureStore";
import "index.css";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

// Fetch the Google client ID from the backend API
fetch("http://localhost:4000/api/google-client-id")
	.then((response) => response.json())
	.then((data) => {
		const { googleClientId } = data;

		root.render(
			<GoogleOAuthProvider clientId={googleClientId}>
				<Provider store={store}>
					<Router>
						<App />
					</Router>
				</Provider>
			</GoogleOAuthProvider>
		);
	})
	.catch((error) => {
		console.error("Error fetching Google client ID:", error);
	});
