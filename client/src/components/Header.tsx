import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ThemeChange from "./ThemeChange";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // let state = useSelector((state: RootState) => state);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    localStorage.getItem("signedIn") === "yes"
      ? localStorage.clear()
      : navigate("/login");
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Box display="flex" alignItems="center">
              <LibraryBooksIcon sx={{ mr: 3 }} />
              <Typography
                variant="h6"
                component="h2"
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
          </Link>

          <Box display="flex" alignItems="center" flexDirection={"row"}>
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <Badge color="error">
                <ThemeChange />
              </Badge>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
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
              {localStorage.getItem("isAdmin") === "true" ? (
                <MenuItem
                  key="admin"
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/admin");
                  }}
                >
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Typography textAlign="center">Admin</Typography>
                  </Link>
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem key="signingInOrOut" onClick={handleCloseUserMenu}>
                {localStorage.getItem("signedIn") === "yes" ? (
                  <Typography textAlign="center">Logout</Typography>
                ) : (
                  <Typography textAlign="center">Login</Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
