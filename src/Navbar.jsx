import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/reducers/auth";
import { IoMdArrowDropdown } from "react-icons/io";
import { Chip } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const settings = [
    {
      name: "Your Profile",
      onClick: () => {
        navigate(`/freindsapp-mern/user/${user._id}`);
      },
    },
    {
      name: "settings",
      onClick: () => {
        navigate("/freindsapp-mern/settings");
      },
    },
    {
      name: "Logout",
      onClick: () => {
        dispatch(logout());
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link style={{ color: "#fff" }} to="/">
              Freinds App
            </Link>
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link style={{ color: "#fff" }} to="/">
              Freinds App
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Chip
              onClick={() => {
                navigate(`/freindsapp-mern/user/${user._id}`);
              }}
              avatar={
                <Avatar
                  sx={{ width: "30px !important", height: "30px !important" }}
                  src={user.profileImageUrl}
                />
              }
              label={
                <Typography color={"white"} fontSize="14px">
                  {user.name}
                </Typography>
              }
              sx={{
                background: "transparent",
                cursor: "pointer",
                padding: "20px 0",
                "&:hover": {
                  background: "#0000000f;",
                },
              }}
            />
            <Tooltip title="Open settings">
              <IconButton
                style={{ padding: "8px" }}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <IoMdArrowDropdown color="white" size={20} />
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
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    setting.onClick();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
