// import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
	const [mode, setMode] = useState<"light" | "dark">("dark");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light",
				);
			},
		}),
		[],
	);

	const theme = useMemo(
		() =>
			createTheme({
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorPrimary: {
								backgroundColor:
									mode === "light" ? "purple" : "#001E3C",
							},
						},
					},
				},
				palette: {
					mode,
				},
			}),
		[mode],
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<Header />
				<CssBaseline />
				<HomePage />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default App;
