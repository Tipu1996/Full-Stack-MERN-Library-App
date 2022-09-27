import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ThemeChange from "./ThemeChange";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <LibraryBooksIcon sx={{ mr: 3 }} />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LIBRARY
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection={"row"}>
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <Badge color="error">
                <ThemeChange />
              </Badge>
            </Box>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="outlined" color="inherit">
                Admin
              </Button>
            </Link>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>User</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
