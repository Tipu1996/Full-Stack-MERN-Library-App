import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduxInitialState } from "../../redux/books";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { tokenExpiry } from "./Header";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const firstName = state.users.user?.firstName;
  const tempPic = localStorage.getItem("picture");
  const [pic, setPic] = useState("");

  useEffect(() => {
    if (tempPic) setPic(tempPic);
  }, [tempPic, pic]);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(reduxInitialState());
    window.location.reload();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (prop: boolean) => {
    if (prop === true) tokenExpiry() ? logout() : navigate("/login");
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {tokenExpiry() ? (
            <Avatar src={pic} alt={firstName} />
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
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography textAlign="center">Admin</Typography>
            </Link>
          </MenuItem>
        ) : null}
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {tokenExpiry() ? (
            <MenuItem
              key="dashBoard"
              onClick={() => {
                handleCloseUserMenu(false);
                navigate("/dashboard");
              }}
            >
              <Typography textAlign="center">DashBoard</Typography>
            </MenuItem>
          ) : null}
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
    </>
  );
};

export default HeaderMenu;
