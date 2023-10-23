import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './NavBar.css';
import Logo from './../images/logo.png';

function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const appBarStyles = {
    backgroundColor: 'transparent', // Transparent background when the sidebar is open
    padding: '0px', // More padding when the sidebar is open
  };

  return (
    <>
      <AppBar position="static" style={appBarStyles}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon fontSize="large" style={{ color: '#335061' }} />
          </IconButton>
          <Link to='/'>
            <img src={Logo} alt="Swayam Logo" className="logo" />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} className='customDrawer'>
            <List style={{marginTop:"15%"}}>
                <ListItem button component={Link} to="/content">
                    <ListItemText primary="Content" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/events">
                    <ListItemText primary="Events" style={{padding:"20px 50px"}}/>
                </ListItem>
            </List>
      </Drawer>

    </>
  );
}

export default NavBar;
