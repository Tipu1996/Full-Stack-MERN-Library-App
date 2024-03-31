import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../App";

const ThemeChange = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<Box
			sx={{
				display: "flex",
				width: "25%",
				alignItems: "center",
				justifyContent: "center",
				color: "text.primary",
				borderRadius: 1,
				p: 3,
			}}>
			<Tooltip title="change theme">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton>
			</Tooltip>
		</Box>
	);
};

export default ThemeChange;
