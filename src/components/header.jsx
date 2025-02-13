import { useState } from 'react';

import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Notifications,
  ExpandMore,
  AccountCircle,
  ExitToApp,
} from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';

import { clearUser } from '@/services/auth/authSlice';

const Header = ({ isSidebarOpen, toggleSidebar, darkMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.persistedReducer?.auth?.user);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(clearUser());
  };
  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        zIndex: 1201,
        background: (theme) => theme.palette.grey[200],
        color: (theme) => theme.palette.grey[800],
        width: isSidebarOpen
          ? { xs: '100%', sm: 'calc(100% - 260px)' }
          : '100%',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color='inherit' onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={toggleTheme} color='inherit'>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton color='inherit'>
            <Badge badgeContent={3} color='error'>
              <Notifications />
            </Badge>
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleMenuOpen}
          >
            <Avatar sx={{ bgcolor: deepOrange[400] }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ mx: 1, fontWeight: 500 }}>
              {user?.name}
            </Typography>
            <ExpandMore />
          </Box>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem disabled>
              <Typography variant='body1'>Welcome, {user?.name}!</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize='small' />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
