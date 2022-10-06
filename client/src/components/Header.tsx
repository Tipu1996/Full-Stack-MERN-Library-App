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
import jwt_decode from "jwt-decode";
import { AppDispatch } from "redux/configureStore";
import { useDispatch } from "react-redux";
import { reduxInitialState } from "redux/books";
import { TokenObject } from "types";

export const tokenExpiry = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedUser: TokenObject = jwt_decode(token);
    if (decodedUser.exp * 1000 < Date.now()) {
      localStorage.clear();
      return false;
    } else return true;
  }
  return false;
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tempPic = localStorage.getItem("picture");
  const [pic, setPic] = React.useState("");

  React.useEffect(() => {
    if (tempPic) setPic(tempPic);
  }, [tempPic]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  React.useEffect(() => {
    tokenExpiry();
  });

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(reduxInitialState());
    window.location.reload();
  };

  const handleCloseUserMenu = (prop: boolean) => {
    if (prop === true) tokenExpiry() ? logout() : navigate("/login");
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
                {tokenExpiry() ? (
                  <Avatar src={pic} />
                ) : (
                  <Avatar src="/broken-image.jpg" />
                )}
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
                    handleCloseUserMenu(false);
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
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  key="dashBoard"
                  onClick={() => {
                    handleCloseUserMenu(false);
                    navigate("/dashboard");
                  }}
                >
                  {tokenExpiry() ? (
                    <Typography textAlign="center">DashBoard</Typography>
                  ) : (
                    ""
                  )}
                </MenuItem>
              </Link>
              <MenuItem
                key="signingInOrOut"
                onClick={() => handleCloseUserMenu(true)}
              >
                {tokenExpiry() ? (
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
