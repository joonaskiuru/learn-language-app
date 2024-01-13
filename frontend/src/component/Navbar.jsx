import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { authToken } from './Contexts';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';

import {
    Link as RouterLink,
    BrowserRouter as Router,
    Routes,
    Route, Navigate, Outlet
} from "react-router-dom";

import Dashboard from "./Dashboard"; 
import Admin from "./Admin";
import Info from "./Info";
import Login from "./Login";

function Navbar() {
  const pages = ['Dashboard', 'Admin', 'Info'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [login,setLogin] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    setLogin(true);
  }

  const handleLogout = () => {
    console.log("pushed")
    sessionStorage.clear();
    setLogin(false);
    return <Login handleLogin={handleLogin}/>
  }

  return (
  <>
    {!login ? <Login handleLogin={handleLogin}/> : 
    <Router>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LANGUAGES
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography component={RouterLink} textAlign="center" to={"/" + page}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LANGUAGES
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block',":hover": {textDecoration: "underline"} }}
                  component={RouterLink}
                  to={"/" + page}              >
                  {page}
                </Button>
              ))}
            </Box>
            <Typography sx={{float: "right", m: 2 }}>{sessionStorage.getItem("user")}</Typography>
            <Button sx={{color: "black",bgcolor: "error.light"}} size="small" onClick={handleLogout}><LogoutIcon/></Button>

          </Toolbar>
        </Container>
            <Routes>
              <Route exact
                path='/'
                element={<Navigate to='/Dashboard'/>} />
              <Route
                exact
                path="/Dashboard/"
                element={<Dashboard />}
            ></Route>
            <Route
                exact
                path="/Admin"
                element={<Admin />}
            ></Route> 
            <Route
                exact
                path="/Info"
                element={<Info />}>
            </Route>     
            </Routes>
      </AppBar>
      </Router>}
    
  </>
  );
}
export default Navbar;
